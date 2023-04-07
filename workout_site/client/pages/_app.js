import '../styles/globals.css'
import { onError } from '@apollo/client/link/error'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
}from '@apollo/client'
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if(graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
  }
});
const link = from([
  errorLink,
  new HttpLink({ uri: 'https://workout-dev.swiles.tech/' }),
])

const client = new ApolloClient({
  cache: new InMemoryCache(), 
  link: link,
})

export default function App({ Component, pageProps }) {
  return <ApolloProvider client={client}> 
    <Component {...pageProps} />
  </ApolloProvider>
}

