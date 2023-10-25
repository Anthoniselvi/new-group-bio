import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MemberLogin from "@/components/Login/MemberLogin";
import { useUserAuth } from "@/context/GroupContext";
import axios from "axios";

import MockAdapter from "axios-mock-adapter";
const axiosMock = new MockAdapter(axios);

axiosMock.onGet("undefined/member/all/1").reply(200, []);

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "1" },
  }),
}));

// Mock the useUserAuth context to provide mock values
jest.mock("@/context/GroupContext", () => ({
  useUserAuth: jest.fn(),
}));

describe("MemberLogin", () => {
  it("renders the component", async () => {
    render(<MemberLogin />);
    const titleElement = await screen.getByText("Log In");
    expect(titleElement).toBeInTheDocument();
  });

  //   it("handles member login", async () => {
  //     render(<MemberLogin />);
  //     const mobileInput = screen.getByPlaceholderText("Mobile");
  //     const signInButton = screen.getByText("Sign In");

  //     // Perform your actions and assertions here

  //     const loggedMemberIdMock = "12345"; // Mocked member ID

  //     // Wait for the text to appear and ensure it's in the document
  //     const loggedMemberText = await screen.findByText(
  //       `Logged Member: ${loggedMemberIdMock}`
  //     );
  //     expect(loggedMemberText).toBeInTheDocument();
  //   });
});
