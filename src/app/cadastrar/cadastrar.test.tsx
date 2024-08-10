import { setup, screen, fireEvent, waitFor } from "@/tests/utils";
import CadastrarPage from "./page";
import "@testing-library/jest-dom";
import { signup } from "../api/auth/signup/actions";

// Mock das funções de API
jest.mock("../api/auth/signup/actions", () => ({
  signup: jest.fn(),
}));

describe("CadastrarPage", () => {
  const renderComponent = () => {
    return setup(<CadastrarPage />);
  };

  it("should render form correctly", () => {
    renderComponent();

    expect(screen.getByLabelText(/selecionar foto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cadastrar/i })
    ).toBeInTheDocument();
  });

  it("deve preencher o formulário e enviar os dados", async () => {
    const { user } = renderComponent();

    await user.type(screen.getByLabelText(/nome completo/i), "João Silva");
    await user.type(screen.getByLabelText(/e-mail/i), "joao@example.com");
    await user.type(screen.getByLabelText(/^senha/i), "senha123");
    await user.type(screen.getByLabelText(/confirmar senha/i), "senha123");
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledTimes(1);
    });

    // screen.debug(screen.getByRole("button", { name: /cadastrar/i }));
    // expect(signup).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     name: "João Silva",
    //     email: "joao@example.com",
    //     password: "senha123",
    //   })
    // );
  });
});
