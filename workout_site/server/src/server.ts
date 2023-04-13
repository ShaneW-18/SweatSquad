import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { constants } from "buffer";
import { GraphQLError } from "graphql";

// The ApolloServer constructor requires two parameters: your schema
// const allowedOrgins = [
//   "http://localhost:3000",
//   "http://localhost:4001",
//   "https://gymsocial.swiles.tech/login",
//   "https://gymsocial.swiles.tech/register"
// ];
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:

//  1. creates an Express app

//  2. installs your ApolloServer instance as middleware

//  3. prepares your app to handle incoming requests

const { url } = await startStandaloneServer(server, {
//   context: async ({ req, res }) => {
//     if (!allowedOrgins.includes(req.headers.origin)) {
//       throw new GraphQLError("incorrect source", {
//         extensions: {
//           code: "UNAUTHENTICATED",
//           httpStatus: 401,
//         },
//       });
//     }
//   },

  listen: { port: 4001 },
});

console.log(`Server ready at: ${url}`);
