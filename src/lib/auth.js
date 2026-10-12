import "server-only";
import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { signSession, verifySession, SESSION_COOKIE, SESSION_SECONDS } from "./token";
import { allowed } from "./permissions";

export async function createSession(user) {
  if (!allowed(user.role, "content")) throw new Error("Forbidden");
  const id = randomUUID();
  const token = await signSession(user.id, id);
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000);
  await prisma.session.create({ data: { id, userId: user.id, expiresAt } });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    expires: expiresAt, sameSite: "lax", path: "/",
  });
}

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const claims = token ? await verifySession(token) : null;
  if (!claims) return null;
  const session = await prisma.session.findUnique({
    where: { id: claims.jti }, include: { user: true },
  });
  if (!session || session.userId !== claims.sub || session.expiresAt <= new Date() ||
      !allowed(session.user.role, "content")) return null;
  const { id, email, name, role } = session.user;
  return { id, email, name, role };
}

export async function requirePermission(permission = "content") {
  const user = await getSession();
  if (!user) redirect("/admin/login");
  if (!allowed(user.role, permission)) throw new Error("Forbidden");
  return user;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const claims = token ? await verifySession(token) : null;
  if (claims) await prisma.session.deleteMany({ where: { id: claims.jti, userId: claims.sub } });
  cookieStore.delete(SESSION_COOKIE);
}
