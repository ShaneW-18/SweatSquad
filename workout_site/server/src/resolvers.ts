import { Database_lookup } from "./userdata.js";
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
};
