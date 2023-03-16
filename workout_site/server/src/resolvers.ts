import { Database_lookup } from "./userdata.js";
import { v4 as uuidv4 } from "uuid";
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
      const temp_user = {
        uuid: uuidv4(),
        username: username,
        password: password,
        email: email,
        description: description,
        age: age,
      };
      return connection.addUser(temp_user);
    },
  },
};
