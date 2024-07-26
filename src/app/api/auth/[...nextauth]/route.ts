import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/api";

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

          const { sub: id } = JSON.parse(
            Buffer.from(access_token.split(".")[1], "base64").toString()
          );

          const { data: userData } = await axios.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${access_token}` },
          });

          const user = {
            access_token,
            image: userData.avatar,
            ...userData,
          };
          return user;
        } catch (error) {
          throw new Error("Credenciais inválidas");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.accessToken = user.access_token;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
