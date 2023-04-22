import { v4 as uuidv4 } from "uuid";
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every User in our data source.
  "User is a user that has a profile in the system with key cridentials for the person"
  type User {
    username: String!
    password: String!
    "UID of account"
    userId: String!
    email: String!
    "an about me created by user"
    description: String
    "other users that are followed by current user"
    following: [User]
    "profile image of user"
    image: String
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
  type scheduleResponce{
    code: Int!
    success: Boolean!
    message: String!
    schedule: schedule
  }
  type trackResponce{
    code: Int!
    success: Boolean!
    message: String!
    track: track
  }

  type workoutResponce{
    code: Int!
    success: Boolean!
    message: String!
    workout: workout
  }
  type exerciseResponce{
    code: Int!
    success: Boolean!
    message: String!
    exercise: exercise
  }
  type schedule{
    "id of schedule"
    scheduleId: String!
    "name of schedule"
    name: String!
    "description of schedule"
    description: String
    "image of schedule"
    image: String
    "workouts in schedule"
    tracks: [track]
    user: User!
  }
  type workout{
    workoutId: String!
    description: String
    isRestDay: Boolean!
    name: String!
    user: User!
    exercises: [exercise]
  }
  type exercise{
    name: String!
    description: String
    exerciseId: String!
  }
  type track{
    name: String!
    trackId: String!
    description: String
    user: User!
    workouts: [workout]
  }

  type genericResponce{
    code: Int!
    success: Boolean!
    message: String!
  }
  type get_All_Schedule_Responce{
    code: Int!
    success: Boolean!
    message: String!
    schedules: [schedule]
  }
  type get_All_Tracks_Responce{
    code: Int!
    success: Boolean!
    message: String!
    tracks: [track]
  }
  type get_All_Workouts_Responce{
    code: Int!
    success: Boolean!
    message: String!
    workouts: [workout]
  }
  type get_all_exercises_responce{
    code: Int!
    success: Boolean!
    message: String!
    exercises: [exercise]
  }



  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Mutation {
    "The login mutation takes a username and password as arguments,and returns an AuthPayload object containing the user token and user object."
    login(email: String!, password: String!): userTypeResponce!
    "Used to add user on register"
    register_user(username: String!, password: String!, email: String!, description: String): userTypeResponce!
    "add a schedule to the database"
    add_schedule(name: String!, description: String, image: String, userId: String!): scheduleResponce!
    add_track(name:String!, description:String, userId:String!): trackResponce!
    add_workout(name: String!, isRestDay: Boolean!, description: String, userId: String!): workoutResponce!
    add_exercise(name: String!, description: String): exerciseResponce!
    add_track_to_schedule(scheduleId: String!, trackId: String!, start: String!, end: String): genericResponce!
    add_workout_to_track(workoutId: String!, trackId: String!, order: Int!): genericResponce!
    add_exercise_to_workout(exerciseId: String!, workoutId: String!, reps: Int, sets: Int, time: String, order: Int!): genericResponce!
    edit_schedule(scheduleId: String!, name: String, description: String, image: String): scheduleResponce!
    edit_track(trackId: String!, name: String, description: String): trackResponce!
    edit_workout(workoutId: String!, name: String, isRestDay: Boolean, description: String): workoutResponce!
    edit_exercise(exerciseId: String!, name: String, description: String): exerciseResponce!
    remove_track_from_schedule(trackScheduleId: String!): genericResponce!
    remove_workout_from_track(workoutTrackId: String!): genericResponce!
    remove_exercise_from_workout(exerciseWorkoutId: String!): genericResponce!
    remove_all_workouts_from_track(trackId: String!): genericResponce!
    remove_all_tracks_from_schedule(scheduleId: String!): genericResponce!
    remove_all_exercises_from_workout(workoutId: String!): genericResponce!
    delete_track(trackId: String!): genericResponce!
    delete_workout(workoutId: String!): genericResponce!

    
  }
  type Query{
    "all of user schedules"
    user_schedules(id: String!): [schedule!]!
    "Get user by UID"
    User(id: String!): userTypeResponce!
    Test: String!
    get_user_username(username: String!): userTypeResponce!
    get_all_schedules_by_userId(userId: String!): get_All_Schedule_Responce!
    get_all_tracks_by_userId(userId: String!): get_All_Tracks_Responce!
    get_all_workouts_by_userId(userId: String!): get_All_Workouts_Responce!
    get_all_exercises: get_all_exercises_responce!
    search_exercises(name: String!): get_all_exercises_responce!
    get_track_by_id(trackId: String!): trackResponce!
    get_workout_by_id(workoutId: String!): workoutResponce!
  }
`;
