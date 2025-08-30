import type { PrismaClient } from "@prisma/client.js";

export type Context = { prisma: PrismaClient; token: string | null };
