import { type Post, PrismaClient, type Profile, type User } from "../generated/client.js";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export { PrismaClient, type User, type Profile, type Post };

export default prisma;
