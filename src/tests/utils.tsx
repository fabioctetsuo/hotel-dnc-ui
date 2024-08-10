import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import userEvent from "@testing-library/user-event";
import { UserRole } from "../../types/user";

const AuthenticatedProvider = ({ children }: { children: React.ReactNode }) => {
  const session = {
    expires: "2024-09-08T23:17:19.362Z",
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhYmlvQHRlc3RlLmNvbSIsInN1YiI6MiwiaWF0IjoxNzIzMjQ0MTk1LCJleHAiOjE3MjMyNDc3OTV9.Q7PCyxgLXtwuUNE-nnWVQLel8KxoYjpXEjr54g8ccxs",
    user: {
      name: "Fabio Tetsuo",
      email: "fabio@teste.com",
      picture: null,
      sub: "2",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhYmlvQHRlc3RlLmNvbSIsInN1YiI6MiwiaWF0IjoxNzIzMjQ0MTk1LCJleHAiOjE3MjMyNDc3OTV9.Q7PCyxgLXtwuUNE-nnWVQLel8KxoYjpXEjr54g8ccxs",
      image: null,
      password: "12345",
      role: "ADMIN" as UserRole,
      id: 2,
      avatar: null,
      createdAt: "2024-07-26T06:08:53.884Z",
      iat: 1723245389,
      exp: 1725837389,
      jti: "53ddec91-94b0-4056-a368-e01304f77a8b",
    },
  };
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AuthenticatedProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// setup function
const setup = (jsx: any) => ({
  user: userEvent.setup(),
  ...customRender(jsx),
});

// override render method
export { customRender as render };
export { userEvent };
export { setup };
