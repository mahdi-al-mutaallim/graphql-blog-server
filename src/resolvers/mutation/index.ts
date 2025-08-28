import bcrypt from "bcryptjs";
import type { Context } from "@/types/context.js";
import type { CreatePostArgs } from "@/types/post.js";
import type { SignInArgs, SignUpArgs } from "@/types/user.js";
import { jwtHelpers } from "@/utils/jwt-helpers.js";

const Mutation = {
  signup: async <P>(_: P, args: SignUpArgs, { prisma }: Context) => {
    const { name, bio, email, password } = args;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return {
        message: "A user with this email already exists",
        access_token: null,
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
    return { message: "User created successfully", token };
  },

  signin: async <P>(_: P, args: SignInArgs, { prisma }: Context) => {
    const user = await prisma.user.findUnique({ where: { email: args.email } });
    if (!user) {
      return { message: "Incorrect Credentials", token: null };
    }
    const isCorrect = await bcrypt.compare(args.password, user.password);
    if (!isCorrect) {
      return { message: "Incorrect Credentials", token: null };
    }
    const token = await jwtHelpers.generateJwtToken({
      userId: user.id,
      type: "access",
    });
    return { message: "Logged in successfully", token };
  },

  createPost: async <P>(_: P, args: CreatePostArgs, { prisma, token }: Context) => {
    if (!token) {
      return { message: "You're not authorized!", post: null };
    }
    const decoded = await jwtHelpers.verifyJwtToken({ token, type: "access" });
    if (!decoded) {
      return { message: "You're not authorized!", post: null };
    }
    if (!args.title || !args.content) {
      return { message: "Title or Content is required.", post: null };
    }

    const result = await prisma.post.create({
      data: { ...args, authorId: decoded.userId },
      include: { author: true },
    });
    return { message: "Post created successfully", post: result };
  }
};

export default Mutation;
