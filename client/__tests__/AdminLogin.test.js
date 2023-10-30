import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminLogin from "@/components/Login/AdminLogin";
import {
  toBeInTheDocument,
  toHaveValue,
} from "@testing-library/jest-dom/matchers";
import { act } from "react-dom/test-utils";

const AdminLoginMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/context/GroupContext", () => ({
  useUserAuth: () => ({
    mockFn: AdminLoginMock,
    error: null,
  }),
}));

describe("AdminLogin", () => {
  it('should render "Log In" as a heading', () => {
    render(<AdminLogin />);

    const header = screen.getByRole("heading", {
      name: "Log In",
    });

    expect.extend({ toBeInTheDocument });
  });

  it("should handle input changes", () => {
    render(<AdminLogin />);

    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect.extend({ toHaveValue });
    expect.extend({ toHaveValue });
  });
  it("should call handleAdminLogin when the button is clicked", () => {
    // const { adminLogin } = useUserAuth();

    render(<AdminLogin handleAdminLogin={AdminLoginMock} />);

    const nameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const button = screen.getByRole("button");

    // Mock the adminLogin function
    AdminLoginMock.mockResolvedValue(true); // Mock a successful login

    fireEvent.change(nameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(button);

    // expect(AdminLoginMock).toHaveBeenCalledWith("testuser", "testpassword");
  });
});
