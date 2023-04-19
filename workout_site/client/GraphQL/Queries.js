import { gql } from "@apollo/client";
export const GET_USER_BY_ID = gql`
  query User($userId: String!) {
    User(id: $userId) {
      description
      email
      userId
      username
    }
  }
`;

export const GET_USERDATA_BY_USERNAME = gql`
query Query($username: String!) {
  get_user_username(username: $username) {
    description
    email
    userId
  }
}
`;

