import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers/index.js";
import prisma from "@prisma/index.js";
import type { Context } from "./types/context.js";

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { context: async (): Promise<Context> => ({ prisma }) });
console.log(`Server ready at ${url}`);
