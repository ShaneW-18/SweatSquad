import { ApolloServer} from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import pg from "pg";
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';



// The ApolloServer constructor requires two parameters: your schema


const server = new ApolloServer({
  typeDefs,
  resolvers,
})
// Passing an ApolloServer instance to the `startStandaloneServer` function:

//  1. creates an Express app

//  2. installs your ApolloServer instance as middleware

//  3. prepares your app to handle incoming requests

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);


