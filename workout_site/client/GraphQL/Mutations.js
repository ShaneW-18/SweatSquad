import {gql} from '@apollo/client';
export const LOGIN = gql`
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            code
            success
            message
            user {
                userId
            }
        }
    }
`

export const REGISTER = gql`
    mutation Mutation($username: String!, $password: String!, $email: String!, $description: String!) {
        register_user(username: $username, password: $password, email: $email, description: $description) {
            code
            success
            message
            user {
                userId
            }
        }
    }
`