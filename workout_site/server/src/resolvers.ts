import { Database_lookup } from "./userdata.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as schedule_Types from "./Types/main.js";
import * as responces from "./Types/responces.js";
import { knexInstance, User } from "./interfaces.js";
import * as user_Querys from "./resolvers/User/querys.js";
import * as user_Mutations from "./resolvers/User/mutations.js";
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
    
    return await schedule_Mutations.create_schedule(name, description, image, userId);

    },

    //create a new track
    add_track: async (
      parent,
      { userId, name, description },
      context,
      info
    ) => {
      const track: schedule_Types.TrackDB = {
        trackId: uuidv4(),
        name: name,
        description: description == undefined ? "" : description,
        userId: userId,

      };

      let responce: responces.scheduleResponce = {
        code: 500,
        success: false,
        message: "sever error",
        schedule: null,

      };
      try {
        await knexInstance("tracks").insert(track);
        await knexInstance("tracks").where("trackId", track.trackId).first();
        return (responce = {
          code: 200,
          success: true,
          message: "track created",
          schedule: null,
        });
      } catch (err) {
        console.log(err);
        return responce;
      }
    },

    //create a new workout
    add_workout: async (
      parent,
      { name, order, isRestDay, trackId },
      context,
      info
    ) => {
      const workout: schedule_Types.WorkoutDB = {
        workoutId: uuidv4(),
        name: name,
        order: order,
        isRestDay: isRestDay,
        trackId: trackId,
      };
      let responce: responces.scheduleResponce = {
        code: 500,
        success: false,
        message: "sever error",
        schedule: null,
      };
      try {
        await knexInstance("workouts").insert(workout);
        await knexInstance("workouts")
          .where("workoutId", workout.workoutId)
          .first();
        return (responce = {
          code: 200,
          success: true,
          message: "workout created",
          schedule: null,
        });
      } catch (err) {
        console.log(err);
        return responce;
      }
    },
    //add exercise
    add_exercise: async (
      parent,
      { name, description, workoutId, sets, reps },
      context,
      info
    ) => {
      const exercise: schedule_Types.ExerciseDB = {
        exerciseId: uuidv4(),
        name: name,
        description: description == undefined ? null : description,
        workoutId: workoutId,
        sets: sets == undefined ? null : sets,
        reps: reps == undefined ? null : reps,
      };
      let responce: responces.scheduleResponce = {
        code: 500,
        success: false,
        message: "sever error",
        schedule: null,
      };
      try {
        await knexInstance("exercises").insert(exercise);
        await knexInstance("exercises")
          .where("exerciseId", exercise.exerciseId)
          .first();
        return (responce = {
          code: 200,
          success: true,
          message: "exercise created",
          schedule: null,
        });
      } catch (err) {
        console.log(err);
        return responce;
      }
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
      console.log("parent in function");
      console.log(parent);
      return null;
    }
  }
};
