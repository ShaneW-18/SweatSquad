import { Database_lookup } from "./userdata.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { knexInstance, User } from "./interfaces.js";
import knex from "knex";

dotenv.config();

const connection = new Database_lookup();
export const resolvers = {
  Query: {
    //get user by id
    User: (parent, { id }, context, info) => {
      return connection.getUser(id);
    },
    get_user_username: async (parent, { username }, context, info) => {
      return await knexInstance("users").where("username", username.toLowerCase()).first();
    }
  },
  Mutation: {
    //register user
    register_user: (
      parent,
      { username, password, email, description, age },
      context,
      info
    ) => {
      password = bcrypt.hashSync(password, 15);
      const temp_user = {
        userId: uuidv4(),
        username: username.toLowerCase(),
        password: password,
        email: email,
        description: description,
      };
      return connection.addUser(temp_user);
    },
    //login user
    login: (parent, { email, password }, context, info) => {
      return connection.login(email, password);
    },
  },
  User: {
    following: async (parent) => {
      console.log("here1");
      const following: User[] = await knexInstance("follows as f")
        .join("users as u", "u.userId", "f.followedUserId")
        .select("u.* as following") // select all columns from `u` and alias as `following`
        .where("f.followingUserId", parent.userId);

      // const followingUsers = following.map(row => row.following);
      return following;
    },
  },

};
