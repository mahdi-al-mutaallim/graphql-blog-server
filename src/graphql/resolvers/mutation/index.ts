import { mergeResolvers } from "@graphql-tools/merge";
import authMutation from "./auth.js";
import postMutation from "./post.js";

const mutationResolvers = mergeResolvers([authMutation, postMutation]);

export default mutationResolvers;
