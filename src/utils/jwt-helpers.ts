import jwt, { type JwtPayload } from "jsonwebtoken";
import type { StringValue } from "ms";

type JwtTokenPayload = JwtPayload & {
	userId: string;
	type: "access" | "refresh";
};

const generateJwtToken = async (payload: JwtTokenPayload) => {
	const secret = payload.type === "access" ? process.env.ACCESS_SECRET : process.env.REFRESH_SECRET;
	const expiresIn = payload.type === "access" ? process.env.ACCESS_EXPIRES : process.env.REFRESH_EXPIRES;
	if (!secret || !expiresIn) {
		throw new Error("JWT secret or expiry not set in environment");
	}
	return jwt.sign({ userId: payload.userId }, secret, {
		expiresIn: expiresIn as StringValue,
	});
};

const verifyJwtToken = async (payload: { token: string; type: "access" | "refresh" }) => {
	const secret = payload.type === "access" ? process.env.ACCESS_SECRET : process.env.REFRESH_SECRET;
	if (!secret) {
		throw new Error("JWT secret not set");
	}
	return jwt.verify(payload.token, secret) as JwtTokenPayload;
};

export const jwtHelpers = { generateJwtToken, verifyJwtToken };
