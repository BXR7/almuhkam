import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { SignJWT } from "jose";
import { signingKey, signSession, verifySession, SESSION_SECONDS } from "../src/lib/token.js";
import { allowed } from "../src/lib/permissions.js";
import { validInquiry, validForm, validEdits, escapeHtml, validId } from "../src/lib/validation.js";

test("secrets fail closed; known fallback is rejected", () => {
  for (const value of [undefined, "short", "aljalal_secret_key_2026_proofreading_platform_secure_token"]) {
    if (value) process.env.JWT_SECRET = value; else delete process.env.JWT_SECRET;
    assert.throws(signingKey);
  }
  process.env.JWT_SECRET = randomBytes(48).toString("base64");
});
test("session JWT requires issuer, audience, subject, jti, lifetime and HS256", async () => {
  const token = await signSession("user", "session");
  const claims = await verifySession(token);
  assert.equal(claims.sub, "user"); assert.equal(claims.jti, "session");
  assert.equal(claims.exp - claims.iat, SESSION_SECONDS);
  assert.equal(await verifySession(token + "x"), null);
  for (const variant of ["expired", "wrong-issuer", "wrong-audience", "no-jti", "algorithm"]) {
    let jwt = new SignJWT({}).setProtectedHeader({ alg: variant === "algorithm" ? "HS384" : "HS256" })
      .setSubject("user").setIssuedAt().setIssuer(variant === "wrong-issuer" ? "other" : "aljalal")
      .setAudience(variant === "wrong-audience" ? "other" : "aljalal-admin")
      .setExpirationTime(variant === "expired" ? "-1s" : "8h");
    if (variant !== "no-jti") jwt = jwt.setJti("session");
    assert.equal(await verifySession(await jwt.sign(signingKey())), null, variant);
  }
  process.env.JWT_SECRET = randomBytes(48).toString("base64");
  assert.equal(await verifySession(token), null, "rotation invalidates old sessions");
});
test("permission matrix denies unknown roles and editor private-data access", () => {
  assert.equal(allowed("ADMIN", "inquiries"), true);
  assert.equal(allowed("ADMIN", "settings"), true);
  assert.equal(allowed("EDITOR", "content"), true);
  for (const role of ["EDITOR", "USER", "admin", undefined]) {
    assert.equal(allowed(role, "inquiries"), false);
    assert.equal(allowed(role, "settings"), false);
  }
  assert.equal(allowed("ADMIN", "unknown"), false);
});
test("inquiry and content validation rejects malformed and oversized inputs", () => {
  const inquiry = { name: "Customer", email: "customer@example.test", phone: "+123", service: "Editing", message: "Hello" };
  assert.ok(validInquiry(inquiry));
  assert.ok(!validInquiry({ ...inquiry, email: 'a" onclick="x@example.test' }));
  assert.ok(!validInquiry({ ...inquiry, message: "x".repeat(10001) }));
  assert.ok(!validInquiry({ ...inquiry, phone: '<img>' }));
  assert.equal(escapeHtml('<img src=x onerror="alert(1)">&'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&amp;');
  assert.ok(!validEdits('{}')); assert.ok(!validEdits('[{"from":{}}]')); assert.ok(validEdits('[]'));
  assert.ok(validId("cm123")); assert.ok(!validId("../admin"));
  const form = new FormData(); form.set("message", "x".repeat(100001)); assert.ok(!validForm(form));
});
