import bcrypt from "bcryptjs";
import type { SigninInput, SignupInput } from "@/types/auth.js";
import type { Payload } from "@/types/payload.js";
import type { Resolver } from "@/types/resolver.js";
import { jwtHelpers } from "@/utils/jwt.js";

type AuthMutation = {
	Mutation: {
		signup: Resolver<unknown, SignupInput, Payload<string | null>>;
		signin: Resolver<unknown, SigninInput, Payload<string | null>>;
	};
};

const authMutation: AuthMutation = {
	Mutation: {
		signup: async (_parent, { name, bio, email, password }, { prisma }) => {
			const user = await prisma.user.findUnique({ where: { email } });
			if (user) {
				return {
					success: false,
					message: "A user with this email already exists",
					data: null,
				};
			}
			const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10));
			const created = await prisma.user.create({
				data: { name, email, password: hashed },
			});
			if (bio) {
				await prisma.profile.create({ data: { bio, userId: created.id } });
			}
			const token = await jwtHelpers.generateJwtToken({
				userId: created.id,
				type: "access",
			});
			return { success: true, message: "User created successfully", data: token };
		},

		signin: async (_parent, { email, password }, { prisma }) => {
			const user = await prisma.user.findUnique({ where: { email } });
			if (!user) {
				return { success: false, message: "Incorrect Credentials", data: null };
			}
			const isCorrect = await bcrypt.compare(password, user.password);
			if (!isCorrect) {
				return { success: false, message: "Incorrect Credentials", data: null };
			}
			const token = await jwtHelpers.generateJwtToken({
				userId: user.id,
				type: "access",
			});
			return { success: true, message: "Logged in successfully", data: token };
		},
	},
};

export default authMutation;
