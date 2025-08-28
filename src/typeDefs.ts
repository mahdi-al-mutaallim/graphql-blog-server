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

type ProfilePayload {
  message: String!
  data: User
}

type Post {
  id: ID!
  title: String!
  content: String!
  published: Boolean!
  createdAt: String!
  author: User!
}

type PostPayload {
  message: String!
  post: Post
}

type AuthPayload {
 message: String!
 token:String
}

type Query {
  profile: ProfilePayload
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
  post(id: ID!): Post
}

type Mutation {
  signup(name: String!, email: String!, password: String!, bio:String): AuthPayload
  signin(email: String!, password: String!):AuthPayload
  createPost(title: String!, content: String!):PostPayload
}

`;

export default typeDefs;
