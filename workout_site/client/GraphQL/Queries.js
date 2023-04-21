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
query ExampleQuery($username: String!) {
  get_user_username(username: $username) {
    code
    message
    success
    user {
      userId
    }
  }
}
`;

export const SEARCH_EXERCISES = gql`
query Query($name: String!) {
  search_exercises(name: $name) {
    code
    success
    message
    exercises {
      description
      exerciseId
      name
    }
  }
}
`;

export const GET_USER_WORKOUTS = gql`
query Query($userId: String!) {
  get_all_workouts_by_userId(userId: $userId) {
    code
    success
    message
    workouts {
      name
      description
      workoutId
    }
  }
}
`;

export const GET_USER_TRACKS = gql`
query Query($userId: String!) {
  get_all_tracks_by_userId(userId: $userId) {
    code
    success
    message
    tracks {
      trackId
      description
      name
    }
  }
}
`;

export const GET_USER_SCHEDULES = gql`
query Query($userId: String!) {
  get_all_schedules_by_userId(userId: $userId) {
    code
    success
    message
    schedules {
      scheduleId
      name
      description
    }
  }
}
`;