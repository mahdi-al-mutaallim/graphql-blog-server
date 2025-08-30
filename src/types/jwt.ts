import type { JwtPayload } from "jsonwebtoken";

export type JwtTokenPayload = JwtPayload & {
	userId: string;
	type: "access" | "refresh";
};
