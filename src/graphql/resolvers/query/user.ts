import type { User } from "@prisma/client.js";
import type { Payload } from "@/types/payload.js";
import type { Posts } from "@/types/post.js";
import type { Resolver } from "@/types/resolver.js";
import type { Users } from "@/types/user.js";
import { jwtHelpers } from "@/utils/jwt.js";

type UserQuery = {
	Query: {
		users: Resolver<unknown, Record<string, never>, Payload<Users | []>>;
		user: Resolver<unknown, { id: string }, Payload<User | null>>;
	};
	User: {
		posts: Resolver<User & { posts?: Posts }, Record<string, never>, Posts>;
	};
};

const userQuery: UserQuery = {
	Query: {
		users: async (_parent, _args, { prisma }) => {
			const result = await prisma.user.findMany({ include: { posts: true } });
			return {
				success: result.length > 0,
				message: result.length > 0 ? "Users retrieved successfully." : "No users available.",
				data: result,
			};
		},

		user: async (_parent, { id }, { prisma }) => {
			const result = await prisma.user.findUnique({ where: { id }, include: { posts: true } });
			return {
				success: !!result,
				message: result ? "User retrieved successfully." : "User not found.",
				data: result || null,
			};
		},
	},

	User: {
		posts: async ({ posts = [], id }, _args, { token }) => {
			if (!token) return posts.filter((post) => post.published);
			const decoded = await jwtHelpers.verifyJwtToken({ token, type: "access" });
			const isMyProfile = id === decoded.userId;
			return isMyProfile ? posts : posts.filter((post) => post.published);
		},
	},
};

export default userQuery;
