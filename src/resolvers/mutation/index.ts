import type { Context } from "@/types/context.js";
import type { SignUpArgs, SignInArgs } from "@/types/user.js";
import { jwtHelpers } from "@/utils/jwt-helpers.js";
import bcrypt from "bcryptjs";

const Mutation = {
  signup: async <P>(_: P, args: SignUpArgs, { prisma }: Context) => {
    const { name, bio, email, password } = args;
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      return { message: "A user with this email already exists", access_token: null }
    }
    const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const created = await prisma.user.create({ data: { name, email, password: hashed } });
    if (bio) {
      await prisma.profile.create({ data: { bio, userId: created.id } })
    }
    const access_token = await jwtHelpers.generateJwtToken({ sub: created.id.toString(), type: "access" })
    return { message: "User created successfully", access_token }
  },

  signin: async<P>(_: P, args: SignInArgs, { prisma }: Context) => {
    const user = await prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
      return { message: "Incorrect Credentials", access_token: null }
    }
    const isCorrect = await bcrypt.compare(args.password, user.password)
    if (!isCorrect) {
      return { message: "Incorrect Credentials", access_token: null }
    }
    const access_token = await jwtHelpers.generateJwtToken({ sub: user.id.toString(), type: "access" })
    return { message: "Logged in successfully", access_token }
  }
}

export default Mutation;
