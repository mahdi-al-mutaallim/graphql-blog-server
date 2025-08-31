const queryType = `#graphql
type Query {
  profile: ProfilePayload
  users: UsersPayload
  user(id: ID!): UserPayload
  posts: PostsPayload
  post(id: ID!): PostPayload
}
`;

export default queryType;
