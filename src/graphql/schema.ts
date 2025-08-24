const typeDefs = `#graphql
type User {
  id: ID!
  name: String!
  email: String!
  createdAt: String!
  posts: [Post!]!
}

type Profile {
  id: ID!
  bio: String
  createdAt: String!
  user: User!
}

type Post {
  id: ID!
  title: String!
  content: String!
  published: Boolean!
  createdAt: String!
  author: User!
}
type CreateUserReturn {
access_token:String!
}
type Query {
  me: User
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
  post(id: ID!): Post
}
type Mutation {
  createUser(name: String!, email: String!, password: String!): CreateUserReturn!
  }
`

export default typeDefs;
