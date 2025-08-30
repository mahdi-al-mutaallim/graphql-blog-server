const postType = `#graphql
type Post {
  id: ID!
  title: String!
  content: String!
  published: Boolean!
  createdAt: String!
  author: User!
}

input PostInput {
  title: String
  content: String
  published: Boolean
}
`;

export default postType;
