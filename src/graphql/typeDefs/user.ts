const userType = `#graphql
type User {
  id: ID!
  name: String!
  email: String!
  createdAt: String!
  posts: [Post!]!
}
`;

export default userType;
