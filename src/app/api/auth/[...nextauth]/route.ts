import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/api";
import { decryptToken } from "@/helpers/decryptToken";
import { cookies } from "next/headers";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");

        try {
          const {
            data: { access_token },
          } = await axios.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const { id } = decryptToken(access_token);

          const { data: userData } = await axios.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${access_token}` },
          });

          const user = {
            access_token,
            image: userData.avatar,
            ...userData,
          };

          cookies().set("access_token", access_token);

          return user;
        } catch (error) {
          console.log(error);
          throw new Error("Credenciais inválidas");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
