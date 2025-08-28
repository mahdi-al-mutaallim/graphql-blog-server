import type { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaClient } from "./generated/client.js";
import type { GlobalOmitConfig } from "./generated/internal/prismaNamespace.js";

const prisma = new PrismaClient();

export { PrismaClient, type GlobalOmitConfig, type DefaultArgs };

export default prisma;
