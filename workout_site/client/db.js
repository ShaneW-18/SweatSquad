import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

let client;
if (!client) {
  client = new ApolloClient({
    link: createHttpLink({
      uri: "https://workout-dev.swiles.tech",
    }),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
});
}
export function closeClient(){
  if(client){
    client.stop();
    client = null;
  }
}
export default client;