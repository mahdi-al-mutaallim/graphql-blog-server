import type { Context } from "@/types/context.js";
import type { CreatePostInput } from "@/types/post.js";
import { jwtHelpers } from "@/utils/jwt.js";

const postMutation = {
	Mutation: {
		createPost: async <P>(_: P, { post }: { post: CreatePostInput }, { prisma, token }: Context) => {
			if (!token) {
				return { success: false, message: "You're not authorized!", data: null };
			}
			const decoded = await jwtHelpers.verifyJwtToken({ token, type: "access" });
			if (!decoded) {
				return { success: false, message: "You're not authorized!", data: null };
			}
			if (!post.title || !post.content) {
				return { success: false, message: "Title or Content is required.", data: null };
			}

			const result = await prisma.post.create({
				data: { ...post, authorId: decoded.userId },
				include: { author: true },
			});
			return { success: true, message: "Post created successfully", data: result };
		},
	},
};

export default postMutation;
