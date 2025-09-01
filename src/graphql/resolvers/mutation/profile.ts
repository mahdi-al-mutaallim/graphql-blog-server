import type { Profile } from "@prisma/client.js";
import type { Payload } from "@/types/payload.js";
import type { UpdateProfileInput } from "@/types/profile.js";
import type { Resolver } from "@/types/resolver.js";
import { jwtHelpers } from "@/utils/jwt.js";

type ProfileMutation = {
	Mutation: {
		updateProfile: Resolver<unknown, UpdateProfileInput, Payload<Profile | null>>;
	};
};
const profileMutation: ProfileMutation = {
	Mutation: {
		updateProfile: async (_parent, { bio }, { prisma, token }) => {
			if (!token) {
				return { success: false, message: "You're not authorized!", data: null };
			}
			const decoded = await jwtHelpers.verifyJwtToken({ token, type: "access" });
			if (!decoded) {
				return { success: false, message: "You're not authorized!", data: null };
			}
			const result = await prisma.profile.upsert({
				where: { userId: decoded.userId },
				update: { bio },
				create: { bio, userId: decoded.userId },
			});

			return { success: true, message: "Profile updated successfully", data: result };
		},
	},
};

export default profileMutation;
