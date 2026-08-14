import jwt from "jsonwebtoken";

const JWT_SECRET =
process.env.JWT_SECRET ||
"your-super-secret-key";

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export function createToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(
    token,
    JWT_SECRET
  ) as JwtPayload;
}