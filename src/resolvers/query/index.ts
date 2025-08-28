import type { Context } from "@/types/context.js";
import { jwtHelpers } from "@/utils/jwt-helpers.js";

const Query = {
	users: async <P, A>(_: P, __: A, { prisma }: Context) => await prisma.user.findMany(),
	profile: async <P, A>(_: P, __: A, { prisma, token }: Context) => {
		if (token) {
			const decoded = await jwtHelpers.verifyJwtToken({
				token,
				type: "access",
			});
			const result = await prisma.user.findUnique({
				where: { id: decoded.userId },
			});
			return { message: "Profile fetched successfully", data: result };
		}
		return { message: "Token is missing", data: null };
	},
};

export default Query;
