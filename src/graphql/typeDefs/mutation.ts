const mutationType = `#graphql
type Mutation {
  signup(name: String!, email: String!, password: String!, bio:String): AuthPayload
  signin(email: String!, password: String!): AuthPayload
  updateProfile(bio: String!): ProfilePayload
  createPost(post: PostInput!): PostPayload
  updatePost(id: String!, post: PostInput): PostPayload
  deletePost(id: String!): PostPayload
}
`;

export default mutationType;
