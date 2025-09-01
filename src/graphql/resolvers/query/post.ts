import type { Post } from "@prisma/client.js";
import type { Payload } from "@/types/payload.js";
import type { Posts } from "@/types/post.js";
import type { Resolver } from "@/types/resolver.js";

type PostQuery = {
	Query: {
		posts: Resolver<unknown, Record<string, never>, Payload<Posts | []>>;
		post: Resolver<unknown, { id: string }, Payload<Post | null>>;
	};
};

const postQuery: PostQuery = {
	Query: {
		posts: async (_parent, _args, { prisma }) => {
			const result = await prisma.post.findMany();
			return {
				success: true,
				message: result.length > 0 ? "Posts retrieved successfully." : "No posts available.",
				data: result,
			};
		},
		post: async (_parent, { id }, { prisma }) => {
			const result = await prisma.post.findUnique({ where: { id }, include: { author: true } });
			return {
				success: true,
				message: result ? "Post retrieved successfully." : "Post not found.",
				data: result,
			};
		},
	},
};

export default postQuery;
