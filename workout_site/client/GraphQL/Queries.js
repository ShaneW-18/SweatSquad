import { gql } from "@apollo/client";
export const GET_USER_BY_ID = gql`
  query User($userId: String!) {
    User(id: $userId) {
      description
      email
      password
      userId
      username
    }
  }
`;
