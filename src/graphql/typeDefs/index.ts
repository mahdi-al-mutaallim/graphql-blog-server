import mutationType from "./mutation.js";
import payloadType from "./payload.js";
import postType from "./post.js";
import profileType from "./profile.js";
import queryType from "./query.js";
import userType from "./user.js";

const typeDefs = [userType, profileType, postType, payloadType, queryType, mutationType];

export default typeDefs;
