import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "aljalal_admin_session";
export const SESSION_SECONDS = 8 * 60 * 60;
const issuer = "aljalal";
const audience = "aljalal-admin";

export function signingKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || new TextEncoder().encode(secret).length < 32 ||
      secret.trim() !== secret || /^(.{1,16})\1+$/s.test(secret) ||
      secret === "aljalal_secret_key_2026_proofreading_platform_secure_token") {
    throw new Error("JWT_SECRET must be a new random secret of at least 32 bytes");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(userId, sessionId) {
  return new SignJWT({}).setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(userId).setJti(sessionId).setIssuer(issuer).setAudience(audience)
    .setIssuedAt().setExpirationTime(`${SESSION_SECONDS}s`).sign(signingKey());
}

export async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, signingKey(), {
      algorithms: ["HS256"], issuer, audience, maxTokenAge: `${SESSION_SECONDS}s`,
      requiredClaims: ["sub", "jti", "iat", "exp"],
    });
    return typeof payload.sub === "string" && typeof payload.jti === "string" ? payload : null;
  } catch {
    return null;
  }
}
