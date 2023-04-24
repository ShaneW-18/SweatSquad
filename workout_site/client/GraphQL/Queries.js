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

export const GET_WORKOUT_BY_ID = gql`
query Query($workoutId: String!) {
  get_workout_by_id(workoutId: $workoutId) {
    code
    message
    success
    workout {
      name
      description
      isRestDay
      exercises {
        exerciseId
        description
        name
        sets
        reps
      }
    }
  }
}
`;

export const GET_TRACK_BY_ID = gql`
query Query($trackId: String!) {
  get_track_by_id(trackId: $trackId) {
    code
    message
    success
    track {
      description
      name
      trackId
      workouts {
        workoutId
        name
        description
        isRestDay
      }
    }
  }
}
`;

export const GET_USER_ID = gql`
query Query($username: String!) {
  get_user_username(username: $username) {
    user {
      userId
    }
    success
    message
    code
  }
}
`;

export const GET_FOLLOWERS=gql`
query Query($userId: String!) {
  get_all_users_followers(userId: $userId) {
    code
    count
    message
    success
    users {
      userId
      image
      username
    }
  }
}
`;

export const GET_FOLLOWING=gql`
query Query($userId: String!) {
  get_all_users_following(userId: $userId) {
    count
    code
    users {
      userId
      username
      image
    }
  }
}
`;

export const GET_CONVERSATIONS=gql`
query Query($userId: String!) {
  User(id: $userId) {
    user {
      conversations {
        conversationId
        name
        messages {
          messageId
          message
          sender {
            userId
            username
          }
          timeSent
        }
      }
    }
  }
}
`;

export const GET_MESSAGES_SINCE=gql`
query Query($date: String!, $conversationId: String!) {
  get_messages_since(date: $date, conversationId: $conversationId) {
    code
    message
    success
    messages {
      messageId
      message
      timeSent
      sender {
        userId
        username
      }
    }
  }
}
`;