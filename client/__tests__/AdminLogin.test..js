import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminLogin from "@/components/Login/AdminLogin";
import {
  toBeInTheDocument,
  toHaveValue,
} from "@testing-library/jest-dom/matchers";
import { useRouter } from "next/router";
import { useUserAuth } from "@/context/GroupContext";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/context/GroupContext", () => ({
  useUserAuth: () => ({
    mockFn: jest.fn(),
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

  // it("should call handleAdminLogin when the button is clicked", async () => {
  //   const mockAdminLogin = jest.fn();

  //   // Mock the adminLogin function
  //   mockAdminLogin.mockImplementation(async (username, password) => {
  //     // Your mock implementation here
  //     expect(username).toBe("testuser");
  //     expect(password).toBe("testpassword");
  //     return true; // Mock a successful login
  //   });

  //   render(<AdminLogin handleAdminLogin={mockAdminLogin} />);

  //   const nameInput = screen.getByPlaceholderText("username");
  //   const passwordInput = screen.getByPlaceholderText("password");
  //   const button = screen.getByRole("button");

  //   fireEvent.change(nameInput, { target: { value: "testuser" } });
  //   fireEvent.change(passwordInput, { target: { value: "testpassword" } });
  //   fireEvent.click(button);

  //   await waitFor(() => {
  //     expect(mockAdminLogin).toHaveBeenCalled();
  //     // expect(mockAdminLogin).toHaveBeenCalledWith("testuser", "testpassword");
  //   });

  //   // Ensure that the adminLogin function was called with the expected arguments
  //   await waitFor(() => {
  //     // expect(mockAdminLogin).toHaveBeenCalled();
  //     expect(mockAdminLogin).toHaveBeenCalledWith("testuser", "testpassword");
  //   });
  // });

  // it("should call handleAdminLogin when the button is clicked", () => {
  //   const mockAdminLogin = jest.fn();

  //   render(<AdminLogin handleAdminLogin={mockAdminLogin} />);

  //   const usernameInput = screen.getByPlaceholderText("username");
  //   const passwordInput = screen.getByPlaceholderText("password");

  //   userEvent.type(usernameInput, "testuser"); // Use userEvent.type to simulate typing
  //   userEvent.type(passwordInput, "testpassword");

  //   const button = screen.getByRole("button");

  //   userEvent.click(button);

  //   expect(mockAdminLogin).toHaveBeenCalled();
  //   expect(mockAdminLogin).toHaveBeenCalledWith("testuser", "testpassword");
  // });
});
