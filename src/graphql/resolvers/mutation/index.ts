import { mergeResolvers } from "@graphql-tools/merge";
import authMutation from "./auth.js";
import postMutation from "./post.js";
import profileMutation from "./profile.js";

const mutationResolvers = mergeResolvers([authMutation, postMutation, profileMutation]);

export default mutationResolvers;
