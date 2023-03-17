import { v4 as uuidv4 } from "uuid";

export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every User in our data source.
  "User is a user that has a profile in the system with key cridentials for the person"
  type User {
    "UID of account"
    id: String!
    username: String!
    password: String!
    age: Int!
    email: String!
    "an about me created by user"
    description: String
    "other users that are followed by current user"
    following: [User]
  }
  "responce structure for login and register"
  type userTypeResponce{
    "code of responce"
    code: Int!
    "if the responce was successful or not"
    success: Boolean!
    "details about the responce"
    message: String!
    "user object if success is true"
    user: User
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Mutation {
    "The login mutation takes a username and password as arguments,and returns an AuthPayload object containing the user token and user object."
    login(username: String!, password: String!): userTypeResponce!
    "Used to add user on register"
    register_user(username: String!, password: String!, age: Int!, email: String!, description: String): userTypeResponce!
  }
  type Query{
    "Get user by UID"
    User(id: String!): User
    Test: String!
  }
 
`;
