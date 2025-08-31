const payloadType = `#graphql

type AuthPayload {
  success: Boolean!
  message: String!
  data: String
}

type ProfilePayload {
  success: Boolean!
  message: String!
  data: Profile
}

type UserPayload {
  success: Boolean!
  message: String!
  data: User
}

type UsersPayload {
  success: Boolean!
  message: String!
  data: [User!]!
}

type PostPayload {
  success: Boolean!
  message: String!
  data: Post
}

type PostsPayload {
  success: Boolean!
  message: String!
  data: [Post!]!
}
`;

export default payloadType;
