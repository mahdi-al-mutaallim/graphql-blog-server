const mutationType = `#graphql
type Mutation {
  signup(name: String!, email: String!, password: String!, bio:String): Payload
  signin(email: String!, password: String!): Payload
  createPost(post: PostInput!): Payload
  updateProfile(bio: String): Payload
  updatePost(id: String!, post: PostInput): Payload
  deletePost(id: String!): Payload
}
`;

export default mutationType;
