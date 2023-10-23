import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminLogin from "@/components/Login/AdminLogin";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import { useRouter } from "next/router";

// Mock the useRouter function to provide a dummy implementation
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the useUserAuth hook to provide required values
jest.mock("@/context/GroupContext", () => ({
  useUserAuth: () => ({
    adminLogin: async () => {
      // Mock your adminLogin function as needed for testing
    },
    error: null, // Set the error value as needed for your test
  }),
}));

describe("AdminLogin", () => {
  it('should render "Log In" as a heading', () => {
    render(<AdminLogin />);

    const header = screen.getByRole("heading", {
      name: "Log In",
    });

    // expect(header).toBeInTheDocument();
    expect.extend({ toBeInTheDocument });
  });
  //   });
  //   it("should handle input changes", () => {
  //     render(<AdminLogin />);

  //     const usernameInput = screen.getByPlaceholderText("username");
  //     const passwordInput = screen.getByPlaceholderText("password");

  //     fireEvent.change(usernameInput, { target: { value: "testuser" } });
  //     fireEvent.change(passwordInput, { target: { value: "testpassword" } });

  //     expect(usernameInput).toHaveValue("testuser");
  //     expect(passwordInput).toHaveValue("testpassword");
  //   });

  // Add more test cases as needed for your component
});
