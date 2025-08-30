import type { User } from "@prisma/client.js";
import type { Payload } from "@/types/payload.js";
import type { Resolver } from "@/types/resolver.js";
import { jwtHelpers } from "@/utils/jwt.js";

type ProfileQuery = {
	Query: {
		profile: Resolver<unknown, Record<string, never>, Payload<User | null>>;
	};
};

const profileQuery: ProfileQuery = {
	Query: {
		profile: async (_parent, _args, { prisma, token }) => {
			if (!token) {
				return { success: false, message: "Access denied. Authentication required.", data: null };
			}
			const decoded = await jwtHelpers.verifyJwtToken({ token, type: "access" });
			const result = await prisma.user.findUnique({ where: { id: decoded.userId } });
			return {
				success: true,
				message: result ? "Profile retrieved successfully." : "Profile not found.",
				data: result,
			};
		},
	},
};

export default profileQuery;
