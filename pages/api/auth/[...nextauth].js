import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "justin" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },

      async authorize(credentials) {
        const { username, password } = credentials;
        try {
          const { data } = await axios({
            url: "http://localhost:3000/api/user/login",
            method: "POST",
            data: {
              username: username,
              password: password,
            },
            "content-type": "application/json",
          });
          if (data) {
            return data;
          } else {
            return null;
          }
        } catch (err) {
          if (err.response.data) {
          } else {
            return err;
          }
        }
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user._id;
      } else {
        return token;
      }
    },
    session: ({ token, session }) => {
      if (user) {
        session.id = token.id;
      }
      return token;
    },
  },
  secret: process.env.JWT,
  jwt: {
    secret: process.env.JWT,
    encoded: true,
  },

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
});
