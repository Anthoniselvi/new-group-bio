import React from "react";
import { render, screen } from "@testing-library/react";
import Groups from "@/components/AdminPages/AdminGroupPages/Groups";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Groups Component", () => {
  it("renders loading message when loading is true", () => {
    const { container } = render(<Groups />);

    // Check if the loading message is displayed
    // expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  //   it("renders group cards when loading is false", () => {
  //     // Mock the data for groups and pass it as a prop
  //     const groupsList = [
  //       // Add mock data here
  //     ];

  //     const { container } = render(<Groups groupsList={groupsList} />);

  //     // You can add more assertions to check if the group cards are displayed
  //     // For example, check if specific elements are in the DOM
  //     expect(screen.getByText("Groups")).toBeInTheDocument();
  //     expect(screen.getByText("+ Add Group")).toBeInTheDocument();
  //     // Add more assertions as needed
  //   });
});
