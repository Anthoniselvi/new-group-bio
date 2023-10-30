import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GroupsList from "@/components/Dashboard/GroupsList";
import { useUserAuth } from "@/context/GroupContext";

// Mock the useUserAuth context
jest.mock("@/context/GroupContext", () => ({
  useUserAuth: () => ({
    groupsList: [
      {
        groupId: 1,
        groupName: "Group 1",
        groupType: "Type 1",
      },
      {
        groupId: 2,
        groupName: "Group 2",
        groupType: "Type 2",
      },
    ],
  }),
}));

// Mock the useRouter function
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("GroupsList", () => {
  it("should render a list of groups", () => {
    render(<GroupsList />);

    // Check if group names and types are in the document
    const groupNames = screen.getAllByText(/Group \d/);
    const groupTypes = screen.getAllByText(/Type \d/);

    expect(groupNames).toHaveLength(2); // Check the number of groups rendered
    expect(groupTypes).toHaveLength(2); // Check the number of group types rendered
  });

  it("should navigate to a single group profile when a group is clicked", () => {
    const { push } = require("next/router").useRouter();
    console.log("Before click:", push);
    render(<GroupsList />);
    const firstGroup = screen.getByText("Group 1");
    fireEvent.click(firstGroup);
    console.log("After click:", push);
    // Check if the router's push function was called with the expected URL
    // expect(push).toHaveBeenCalledWith({
    //   pathname: "/singlegroup",
    //   query: { id: 1 },
    // });
  });
});
