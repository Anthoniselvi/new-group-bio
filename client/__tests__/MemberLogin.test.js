import { render, screen, fireEvent } from "@testing-library/react";
import MemberLogin from "@/components/Login/MemberLogin";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import axios from "axios";
import { act } from "react-dom/test-utils";

// Mock the useUserAuth context
jest.mock("@/context/GroupContext", () => ({
  useUserAuth: () => ({
    memberLogin: jest.fn(),
    loggedMemberId: "some-logged-member-id",
  }),
}));

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "1" },
  }),
}));

describe("MemberLogin", () => {
  it("renders the component", () => {
    render(<MemberLogin />);
    const titleElement = screen.getByText("Log In");
    expect.extend({ toBeInTheDocument });
  });

  it("handles member login with valid input", async () => {
    const { container } = render(<MemberLogin />);
    const memberLoginMock = jest.fn();

    // Mock the axios call for fetching members
    axios.get = jest.fn().mockResolvedValue({ data: [] });

    // Find the input element and set a valid mobile number
    const inputElement = container.querySelector("input");
    fireEvent.change(inputElement, { target: { value: "1234567890" } });

    // Wrap the asynchronous code inside `act`
    await act(async () => {
      const signInButton = screen.getByText("Sign In");
      fireEvent.click(signInButton);
    });

    // Assert that the memberLogin function was called with the correct parameters
    // expect(memberLoginMock).toHaveBeenCalledWith("1234567890", []);

    // Perform any other assertions inside `act` as needed
  });

  it("handles member login with invalid input", () => {
    const { container } = render(<MemberLogin />);

    // Find the "Sign In" button and click it without entering a mobile number
    const signInButton = screen.getByText("Sign In");
    fireEvent.click(signInButton);

    // Assert that an error message is displayed
    const errorElement = screen.getByText("Please enter a mobile number.");
    expect.extend({ toBeInTheDocument });
  });
});
