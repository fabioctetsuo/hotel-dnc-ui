import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    access_token: string;
  }
  interface Session {
    /** The user's postal address. */
    accessToken: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: "ADMIN" | "USER";
      avatar: string | null;
      image: string | null;
      createdAt: string;
      access_token: string;
    };
  }
}
