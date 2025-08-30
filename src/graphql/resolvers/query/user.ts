import type { User } from "@prisma/client.js";
import type { Payload } from "@/types/payload.js";
import type { Resolver } from "@/types/resolver.js";
import type { Users } from "@/types/user.js";

type UserQuery = {
	Query: {
		users: Resolver<unknown, Record<string, never>, Payload<Users | []>>;
		user: Resolver<unknown, { id: string }, Payload<User | null>>;
	};
};

const userQuery: UserQuery = {
	Query: {
		users: async (_parent, _args, { prisma }) => {
			const result = await prisma.user.findMany();
			return {
				success: true,
				message: result.length > 0 ? "Users retrieved successfully." : "No users available.",
				data: result,
			};
		},
		user: async (_parent, { id }, { prisma }) => {
			const result = await prisma.user.findUnique({ where: { id } });
			return { success: true, message: result ? "User retrieved successfully." : "User not found.", data: result };
		},
	},
};

export default userQuery;
