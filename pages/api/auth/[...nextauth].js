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
        const user = await axios({
          url: `${url}/api/user/login`,
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
            if (err.response.data) {
              throw new Error(err.response.data);
            } else {
              return null;
            }
            return null;
          });
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
});
