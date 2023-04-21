import { Database_lookup } from "./userdata.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as schedule_Types from "./Types/main.js";
import * as responces from "./Types/responces.js";
import { knexInstance, User } from "./interfaces.js";
import * as user_Querys from "./resolvers/User/querys.js";
import * as user_Mutations from "./resolvers/User/mutations.js";
import * as schedule_Querys from "./resolvers/schedule/querys.js";
import knex from "knex";
import * as types from "./Types/main.js";
import * as schedule_Mutations from "./resolvers/schedule/mutations.js";
dotenv.config();

const connection = new Database_lookup();
export const resolvers = {
  Query: {
    //get user by id
    User: async (parent, { id }, context, info) => {
      return await user_Querys.get_user_by_id(id);
    },
    get_user_username: async (parent, { username }, context, info) => {
      return await user_Querys.get_user_by_username(username);
    },
    get_all_schedules_by_userId: async (parent, { userId }, context, info) => {
      return await schedule_Querys.get_schedule_by_username(userId);
    },
    get_all_tracks_by_userId: async (parent, { userId }, context, info) => {
      return await schedule_Querys.get_all_tracks_by_userId(userId);
    },
    get_all_workouts_by_userId: async (parent, { userId }, context, info) => {
      return await schedule_Querys.get_all_workouts_by_userId(userId);
    },
    get_all_exercises: async (parent, params, context, info) => {
      return await schedule_Querys.get_all_exercises();
    },
    search_exercises: async (parent, { name }, context, info) => {
      return await schedule_Querys.search_exercises(name);
    },
  },
  Mutation: {
    //register user
    register_user: async (
      parent,
      { username, password, email, description },
      context,
      info
    ) => {
      return await user_Mutations.register_user(
        username,
        password,
        email,
        description
      );
    },
    //login user
    login: (parent, { email, password }, context, info) => {
      return connection.login(email, password);
    },

    //start a new schedule
    add_schedule: async (
      parent,
      { name, description, image, userId },
      context,
      info
    ) => {
      return await schedule_Mutations.create_schedule(
        name,
        description,
        image,
        userId
      );
    },

    //create a new track
    add_track: async (parent, { userId, name, description }, context, info) => {
      return await schedule_Mutations.create_track(userId, name, description);
    },

    //create a new workout
    add_workout: async (
      parent,
      { name, isRestDay, description, userId },
      context,
      info
    ) => {
      return await schedule_Mutations.create_workout(
        name,
        isRestDay,
        description,
        userId
      );
    },
    //add exercise
    add_exercise: async (parent, { name, description }, context, info) => {
      return await schedule_Mutations.create_exercise(name, description);
    },
    add_track_to_schedule: async (
      parent,
      { trackId, scheduleId, start, end },
      context,
      info
    ) => {
      return await schedule_Mutations.add_track_to_schedule(
        trackId,
        scheduleId,
        start,
        end
      );
    },
    add_workout_to_track: async (
      parent,
      { workoutId, trackId, order },
      context,
      info
    ) => {
      return await schedule_Mutations.add_workout_to_track(
        workoutId,
        trackId,
        order
      );
    },
    add_exercise_to_workout: async (
      parent,
      { exerciseId, workoutId, reps, sets, time, order },
      context,
      info
    ) => {
      return await schedule_Mutations.add_exercise_to_workout(
        exerciseId,
        workoutId,
        reps,
        sets,
        time,
        order
      );
    },
    edit_schedule: async (
      parent,
      { name, description, image, scheduleId },
      context,
      info
    ) => {
      return await schedule_Mutations.edit_schedule(
        name,
        description,
        image,
        scheduleId
      );
    },
    edit_track: async (
      parent,
      { trackId, name, description },
      context,
      info
    ) => {
      return await schedule_Mutations.edit_track(trackId, name, description);
    },
    edit_workout: async (
      parent,
      { name, description, isRestDay, workoutId },
      context,
      info
    ) => {
      return await schedule_Mutations.edit_workout(
        name,
        description,
        isRestDay,
        workoutId
      );
    },
    edit_exercise: async (
      parent,
      { exerciseId, name, description },
      context,
      info
    ) => {
      return await schedule_Mutations.edit_exercise(
        exerciseId,
        name,
        description
      );
    },
    remove_track_from_schedule: async (
      parent,
      { trackId, scheduleId },
      context,
      info
    ) => {
      return await schedule_Mutations.remove_track_from_schedule(
        trackId,
        scheduleId
      );
    },
    remove_workout_from_track: async (
      parent,
      { workoutId, trackId },
      context,
      info
    ) => {
      return await schedule_Mutations.remove_workout_from_track(
        workoutId,
        trackId
      );
    },
    remove_exercise_from_workout: async (
      parent,
      { exerciseId, workoutId },
      context,
      info
    ) => {
      return await schedule_Mutations.remove_exercise_from_workout(
        exerciseId,
        workoutId
      );
    },
  },

  User: {
    following: async (parent) => {
      const following: User[] = await knexInstance("follows as f")
        .join("users as u", "u.userId", "f.followedUserId")
        .select("u.* as following") // select all columns from `u` and alias as `following`
        .where("f.followingUserId", parent.userId);
      return following;
    },
  },
  schedule: {
    user: async (parent) => {
      const user: types.User = await knexInstance("users")
        .where("userId", parent.userId)
        .first();
      return user;
    },
    tracks: async (parent) => {
      const tracks: types.Track[] = await knexInstance("tracks as t")
        .join("track_schedules as st", "st.trackId", "t.trackId")
        .select("t.* as track")
        .where("st.scheduleId", parent.scheduleId);

      return tracks;
    },
  },
  track: {
    user: async (parent) => {
      console.log("track user");
      const user: types.User = await knexInstance("users")
        .where("userId", parent.userId)
        .first();
      return user;
    },
    workouts: async (parent) => {
      console.log("track workouts");
      const workouts: types.Workout[] = await knexInstance("workouts as w")
        .join("workout_tracks as tw", "tw.workoutId", "w.workoutId")
        .select("w.* as workout")
        .where("tw.trackId", parent.trackId);
      return workouts;
    },
  },
  workout: {
    user: async (parent) => {
      const user: types.User = await knexInstance("users")
        .where("userId", parent.userId)
        .first();
      return user;
    },
    exercises: async (parent) => {
      const exercises: types.Exercise[] = await knexInstance("exercises as e")
        .join("exercise_workouts as we", "we.exerciseId", "e.exerciseId")
        .select("e.* as exercise")
        .where("we.workoutId", parent.workoutId);
      return exercises;
    },
  },
};
