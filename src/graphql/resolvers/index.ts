import { mergeResolvers } from "@graphql-tools/merge";
import mutationResolvers from "./mutation/index.js";
import queryResolvers from "./query/index.js";

const resolvers = mergeResolvers([queryResolvers, mutationResolvers]);

export default resolvers;
