const queryType = `#graphql
type Query {
  profile: Payload
  users: UsersPayload
  user(id: ID!): Payload
  posts: PostsPayload
  post(id: ID!): Payload
}
`;

export default queryType;
