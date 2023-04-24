import { gql } from "@apollo/client";
export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      code
      success
      message
      user {
        userId
        username
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Mutation(
    $username: String!
    $password: String!
    $email: String!
    $description: String!
  ) {
    register_user(
      username: $username
      password: $password
      email: $email
      description: $description
    ) {
      code
      success
      message
      user {
        userId
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation Mutation($name: String!) {
    add_exercise(name: $name) {
      code
      exercise {
        description
        name
        exerciseId
      }
      message
      success
    }
  }
`;

export const ADD_WORKOUT = gql`
mutation Mutation($name: String!, $isRestDay: Boolean!, $userId: String!, $description: String) {
  add_workout(name: $name, isRestDay: $isRestDay, userId: $userId, description: $description) {
    code
    success
    message
    workout {
      workoutId
    }
  }
}
`;

export const ADD_TRACK = gql`
mutation Mutation($name: String!, $userId: String!, $description: String) {
  add_track(name: $name, userId: $userId, description: $description) {
    code
    success
    message
    track {
      trackId
    }
  }
}
`;

export const ADD_WORKOUT_TO_TRACK = gql`
mutation Mutation($workoutId: String!, $trackId: String!, $order: Int!) {
  add_workout_to_track(workoutId: $workoutId, trackId: $trackId, order: $order) {
    code
    message
    success
  }
}
`;

export const DELETE_WORKOUTS=gql`
mutation Mutation($trackId: String!) {
  remove_all_workouts_from_track(trackId: $trackId) {
    code
    message
    success
  }
}
`;

export const ADD_EXERCISE_TO_WORKOUT=gql`
mutation Mutation($exerciseId: String!, $workoutId: String!, $order: Int!, $reps: Int, $sets: Int) {
  add_exercise_to_workout(exerciseId: $exerciseId, workoutId: $workoutId, order: $order, reps: $reps, sets: $sets) {
    code
    success
    message
  }
}
`;

export const DELETE_EXERCISES=gql`
mutation Mutation($workoutId: String!) {
  remove_all_exercises_from_workout(workoutId: $workoutId) {
    code
    message
    success
  }
}
`;

export const FOLLOW_USER = gql`
mutation Mutation($followingId: String!, $followedId: String!) {
  follow_user(followingId: $followingId, followedId: $followedId) {
    success
    message
    code
  }
}
`;

export const UNFOLLOW_USER = gql`
mutation Mutation($followingId: String!, $followedId: String!) {
  unfollow_user(followingId: $followingId, followedId: $followedId) {
    code
    message
    success
  }
}
`;

export const CREATE_CONVERSATION=gql`
mutation Mutation($userId: [String!]!, $name: String!) {
  create_conversation(userId: $userId, name: $name) {
    success
    conversation {
      conversationId
      name
    }
    message
    code
  }
}
`;

export const SEND_MESSAGE=gql`
mutation Mutation($conversationId: String!, $message: String!, $userId: String!) {
  create_message(conversationId: $conversationId, message: $message, userId: $userId) {
    code
    success
    message {
      messageId
      timeSent
      sender {
        userId
        username
      }
      message
    }
  }
}
`;