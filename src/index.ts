import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import prisma from "@prisma/index.js";
import resolvers from "./resolvers/index.js";
import typeDefs from "./typeDefs.js";
import type { Context } from "./types/context.js";

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
	context: async ({ req }): Promise<Context> => ({
		prisma,
		token: req.headers.authorization || null,
	}),
});
console.log(`Server ready at ${url}`);
