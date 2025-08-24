import type { CreateUser } from "@/types/user.js";
import prisma from "@prisma/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany()
  },
  Mutation: {
    createUser: async <P>(_: P, args: CreateUser): Promise<{ access_token: string }> => {
      const { password, ...rest } = args;
      const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10));
      const created = await prisma.user.create({ data: { ...rest, password: hashed } });
      const access_token = jwt.sign({ userId: created.id }, 'secret', { expiresIn: '1d' })
      return { access_token }
    }
  }
}

export default resolvers;
