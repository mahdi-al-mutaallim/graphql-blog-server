import jwt, { type JwtPayload } from "jsonwebtoken";
import type { StringValue } from "ms";


const generateJwtToken = async (payload: JwtPayload & { type: "access" | "refresh" }) => {
  const secret = (payload.type === "access" ? process.env.ACCESS_SECRET : process.env.REFRESH_SECRET) || 'Secret'
  const expiresIn = (payload.type === "access" ? process.env.ACCESS_EXPIRES : process.env.REFRESH_EXPIRES) || "30d";
  return jwt.sign(payload, secret, { expiresIn: expiresIn as StringValue });
};

const verifyJwtToken = async (token: string, tokenType: "access" | "refresh") => {
  if (!token) {
    return { success: false, decoded: null }
  }
  const secret = tokenType === "access" ? "accessTokenSecret" : "refreshTokenSecret"
  const decoded = jwt.verify(token, secret)
  return { success: true, decoded };
};

export const jwtHelpers = { generateJwtToken, verifyJwtToken };
