import { Database_lookup } from "./userdata.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const connection = new Database_lookup();
export const resolvers = {
  Query: {
    //get user by id
    User: (parent, { id }, context, info) => {
      return connection.getUser(id);
    },
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
        uuid: uuidv4(),
        username: username,
        password: password,
        email: email,
        age: age,
        description: description,
      };
      return connection.addUser(temp_user);
    },
    //login user
    login: (parent, { email, password }, context, info) => {
      return connection.login(email, password);
    }
  },
};
