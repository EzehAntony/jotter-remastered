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

      async authorize(credentials, req) {
        const url = req.body.callbackUrl.split("/auth")[0];
        const { username, password } = credentials;

        try {
          const res = await axios({
            url: `${url}/api/user/login`,
            method: "POST",
            data: {
              username: username,
              password: password,
            },
            "content-type": "application/json",
          });
          if (res.statusText === "OK") {
            return res.data;
          }
        } catch (err) {
          throw new Error(err.response.data);
        }
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
});
