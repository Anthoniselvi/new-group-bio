import { render, screen } from "@testing-library/react";
import AdminLogin from "./AdminLogin";

describe("AdminLogin", () => {
  it('should render "Log In" as a heading', () => {
    render(<AdminLogin />);

    const header = screen.getByRole("heading", {
      name: "Log In",
    });

    expect(header).toBeInTheDocument();
  });
});
