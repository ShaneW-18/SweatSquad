import "../styles/globals.css";
import { onError } from "@apollo/client/link/error";
import { SessionProvider } from "next-auth/react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { Router } from "next/router";
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({ uri: "https://workout-dev.swiles.tech/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function Loading() {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 loading-main flex justify-center items-center">
      <div className="lds-dual-ring" />
    </div>
  );
}

export default function App({ Component, pageProps, session }: any) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        {loading && <Loading />}
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}
