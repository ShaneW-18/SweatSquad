import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN } from "../../../GraphQL/Mutations.js";
import { useApolloClient, gql } from "@apollo/client";
import { User } from "next-auth";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://workout-dev.swiles.tech",
  }),
  cache: new InMemoryCache(),
});

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { username, password } = credentials as any;
        try {
          const { data } = await client.mutate({
            mutation: LOGIN,
            variables: {
              email: username,
              password: password,
            },
          });
          if (data.login.code === 200) {
            const { user } = data.login;
            return user;
            //successToast(data.login.message);
          } else {
            return null;
          }
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: "process.env.JWT_SECRET",
  callbacks: {
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      session.user.userId = token.userId;
      session.user.username = token.username;

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      const allowed = true;

      return allowed;
    },
    // async redirect({ url, baseUrl }){
    //     if (url.startsWith('/')){
    //         return `${baseUrl}${url}`;
    //     } else if (new URL(url).origin === baseUrl){
    //         return url;
    //     }
    //     return baseUrl;
    // },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.userId = user.userId;
        token.username = user.username;
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
