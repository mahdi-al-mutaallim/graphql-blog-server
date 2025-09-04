import type { Profile, User } from "@prisma/client.js";
import type { Payload } from "@/types/payload.js";
import type { Resolver } from "@/types/resolver.js";
import { jwtHelpers } from "@/utils/jwt.js";

type ProfileQuery = {
	Query: {
		profile: Resolver<unknown, Record<string, never>, Payload<(Profile & { user: User }) | null>>;
	};
	Profile: {
		user: Resolver<Profile & { user: User }, Record<string, never>, User>;
	};
};

const profileQuery: ProfileQuery = {
	Query: {
		profile: async (_parent, _args, { prisma, token }) => {
			if (!token) {
				return { success: false, message: "Access denied. Authentication required.", data: null };
			}
			const { userId } = await jwtHelpers.verifyJwtToken({ token, type: "access" });
			const profileWithUser = await prisma.profile.findUnique({ where: { userId }, include: { user: true } });
			return {
				success: !!profileWithUser,
				message: profileWithUser ? "Profile retrieved successfully." : "Profile not found.",
				data: profileWithUser || null,
			};
		},
	},

	Profile: {
		user: ({ user }) => {
			if (!user) throw new Error("User not found");
			return user;
		},
	},
};

export default profileQuery;
