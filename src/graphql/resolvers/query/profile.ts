import type { Profile, User } from "@prisma/client.js";
import type { Payload } from "@/types/payload.js";
import type { Resolver } from "@/types/resolver.js";
import { jwtHelpers } from "@/utils/jwt.js";

type ProfileQuery = {
  Query: {
    profile: Resolver<unknown, Record<string, never>, Payload<Profile | null>>;
    user: Resolver<Profile, Record<string, never>, Payload<User | null>>;
  };
};

const profileQuery: ProfileQuery = {
  Query: {
    profile: async (_parent, _args, { prisma, token }) => {
      if (!token) {
        return { success: false, message: "Access denied. Authentication required.", data: null };
      }
      const decoded = await jwtHelpers.verifyJwtToken({ token, type: "access" });
      const result = await prisma.profile.findUnique({ where: { userId: decoded.userId } });
      return {
        success: !!result,
        message: result ? "Profile retrieved successfully." : "Profile not found.",
        data: result,
      };
    },
    user: async ({ userId }, _args, { prisma }) => {
      const result = await prisma.user.findUnique({ where: { id: userId } });
      return { success: !!result, message: result ? "User retrieved successfully." : "User doesn't exists", data: result }
    }
  },
};

export default profileQuery;
