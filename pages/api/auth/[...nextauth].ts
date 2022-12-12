import nextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";
export default nextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        return (await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        )) as any;
      },
    }),
  ],
  session: {
    maxAge: 2592000,
    strategy: "jwt",
    updateAge: 86400,
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log({ token, account, user });
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "credentials":
            token.user = user;
            break;
          case "oauth":
            token.user = await dbUsers.oauthDbUser(
              user?.email || "",
              user?.name || ""
            );
            break;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log({ session, token });
      session.accessToken = token.accessToken as string;
      session.user = token.user as any;
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
