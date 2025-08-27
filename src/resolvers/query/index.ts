import type { Context } from "@/types/context.js";
import type { ProfileArgs } from "@/types/profile.js";

const Query = {
  users: async <P, A>(_: P, __: A, { prisma }: Context) => await prisma.user.findMany(),
  profile: async <P>(_: P, { userId }: ProfileArgs, { prisma }: Context) => await prisma.profile.findFirst({ where: { userId } })
}

export default Query;
