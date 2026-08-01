import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "orbit360_super_secret_jwt_key_2026";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "orbit360_super_secret_refresh_key_2026";

export interface JWTPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
  department?: string;
}

export function signAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function signRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}
