import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN } from "../../../GraphQL/Mutations.js";
import { useApolloClient, gql } from "@apollo/client";
import { User } from "next-auth";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import client from "../../../db.js";

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
    maxAge: 900
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 900
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
      // console.log("user________");
      // console.log(user);
      // console.log("account_________");
      // console.log(account);
      // console.log("profile______");
      // console.log(profile);
      // console.log("email_______");
      // console.log(email);
      // console.log("credentials_______");
      // console.log(credentials);
      return allowed;
    },
    async redirect({ url, baseUrl }){
      // console.log("url_______");
      // console.log(url);
      // console.log("baseUrl_______");
      // console.log(baseUrl);
        baseUrl = "https://gymsocial.swiles.tech";
        if (url.startsWith('/')){
            return `${baseUrl}${url}`;
        } else if (new URL(url).origin === baseUrl){
            return url;
        }
        return baseUrl;
    },
    async jwt({ token, user, account }) {
      // console.log("token_______");
      // console.log(token);
      // console.log("user_______");
      // console.log(user);
      // console.log("account_______");
      // console.log(account);
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
  pages: {
    signIn: "/login",
    signOut: "/login",
  }
};

export default NextAuth(authOptions);
