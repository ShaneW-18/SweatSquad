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
      return null;
    },
  },
  track: {
    user: async (parent) => {
      const user: types.User = await knexInstance("users")
        .where("userId", parent.userId)
        .first();
      return user;
    },
    workouts: async (parent) => {
      return null;
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
      return null;
    },
  },
};
