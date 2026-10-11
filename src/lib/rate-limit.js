import "server-only";
import { createHmac } from "node:crypto";
import prisma from "@/lib/prisma";
import { signingKey } from "./token";

// Atomic fixed window, shared across instances. Keys do not store customer email.
// Configure ingress limits too: account limits alone cannot stop distributed spam.
export async function consumeLimit(scope, identity, maximum, seconds) {
  const key = createHmac("sha256", signingKey()).update(`${scope}:${identity}`).digest("hex");
  const rows = await prisma.$queryRaw`
    INSERT INTO app_private."RateLimit" ("key", "count", "resetAt")
    VALUES (${key}, 1, NOW() + ${seconds} * INTERVAL '1 second')
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE WHEN "RateLimit"."resetAt" <= NOW() THEN 1 ELSE "RateLimit"."count" + 1 END,
      "resetAt" = CASE WHEN "RateLimit"."resetAt" <= NOW() THEN NOW() + ${seconds} * INTERVAL '1 second' ELSE "RateLimit"."resetAt" END
    RETURNING "count"`;
  return rows[0].count <= maximum;
}
