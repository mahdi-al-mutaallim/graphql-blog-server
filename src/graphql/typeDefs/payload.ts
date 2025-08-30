const payloadType = `#graphql
type Payload {
  success: Boolean!
  message: String!
  data: Result
}

type UsersPayload {
  success: Boolean!
  message: String!
  data: [User!]!
}

type PostsPayload {
  success: Boolean!
  message: String!
  data: [Post!]!
}

union Result = Profile | User | Post
`;

export default payloadType;
