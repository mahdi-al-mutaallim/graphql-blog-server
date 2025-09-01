import type { Post } from "@prisma/client.js";
import type { Payload } from "@/types/payload.js";
import type { PostInput } from "@/types/post.js";
import type { Resolver } from "@/types/resolver.js";
import { jwtHelpers } from "@/utils/jwt.js";

type PostMutation = {
	Mutation: {
		createPost: Resolver<unknown, { post: PostInput }, Payload<Post | null>>;
		updatePost: Resolver<unknown, { id: string; post: PostInput }, Payload<Post | null>>;
		publishPost: Resolver<unknown, { id: string }, Payload<null>>;
		deletePost: Resolver<unknown, { id: string }, Payload<null>>;
	};
};

const postMutation: PostMutation = {
	Mutation: {
		createPost: async (_parent, { post }, { prisma, token }) => {
			if (!token) {
				return { success: false, message: "You're not authorized!", data: null };
			}
			const decoded = await jwtHelpers.verifyJwtToken({ token, type: "access" });

			if (!decoded) {
				return { success: false, message: "You're not authorized!", data: null };
			}

			const result = await prisma.post.create({
				data: { ...post, authorId: decoded.userId },
				include: { author: true },
			});
			return { success: true, message: "Post created successfully", data: result };
		},

		updatePost: async (_parent, { id, post }, { prisma, token }) => {
			if (!token) {
				return { success: false, message: "You're not authorized!", data: null };
			}
			const decoded = await jwtHelpers.verifyJwtToken({ token, type: "access" });
			if (!decoded) {
				return { success: false, message: "You're not authorized!", data: null };
			}

			const result = await prisma.post.update({
				where: { id },
				data: { ...post },
				include: { author: true },
			});
			return { success: true, message: "Post updated successfully", data: result };
		},

		publishPost: async (_parent, { id }, { prisma, token }) => {
			if (!token) {
				return { success: false, message: "You're not authorized!", data: null };
			}
			const decoded = await jwtHelpers.verifyJwtToken({ token, type: "access" });
			if (!decoded) {
				return { success: false, message: "You're not authorized!", data: null };
			}
			await prisma.post.update({ where: { id }, data: { published: true } });
			return { success: true, message: "Post published successfully", data: null };
		},

		deletePost: async (_parent, { id }, { prisma, token }) => {
			if (!token) {
				return { success: false, message: "You're not authorized!", data: null };
			}
			const decoded = await jwtHelpers.verifyJwtToken({ token, type: "access" });
			if (!decoded) {
				return { success: false, message: "You're not authorized!", data: null };
			}
			await prisma.post.delete({ where: { id } });
			return { success: true, message: "Post deleted successfully", data: null };
		},
	},
};

export default postMutation;
