import { Database_lookup } from "./userdata.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const connection = new Database_lookup();
export const resolvers = {
  Query: {
    Test: () => {
      return "success";
    },
    User: (parent, { id }, context, info) => {
      return connection.getUser(id);
    },
  },
  Mutation: {
    register_user: (
      parent,
      { username, password, email, description, age },
      context,
      info
    ) => {

      password = bcrypt.hashSync(password, 15);
      const temp_user = {
        uuid: uuidv4(),
        username: username,
        password: password,
        email: email,
        age: age,
      };
      return connection.addUser(temp_user);
    },
    login: (parent, { username, password }, context, info) => {
      return connection.login(username, password);
    }
  },
};
