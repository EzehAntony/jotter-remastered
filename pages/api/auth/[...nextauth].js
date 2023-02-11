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
        await axios({
          url: "https://crayonne-jotter.vercel.app/auth/login",
          method: "POST",
          data: {
            username: username,
            password: password,
          },
          "content-type": "application/json",
        })
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log(err);
            throw new Error(err.response.data);
          });
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
      if (token) {
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
