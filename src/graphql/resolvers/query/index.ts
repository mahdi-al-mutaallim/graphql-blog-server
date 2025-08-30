import { mergeResolvers } from "@graphql-tools/merge";
import postQuery from "./post.js";
import profileQuery from "./profile.js";
import userQuery from "./user.js";

const queryResolvers = mergeResolvers([userQuery, profileQuery, postQuery]);

export default queryResolvers;
