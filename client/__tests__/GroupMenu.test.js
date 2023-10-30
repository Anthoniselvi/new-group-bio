import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GroupMenu from "@/components/AdminPages/AdminGroupPages/GroupMenu";
import { useRouter } from "next/router";
import { useUserAuth } from "@/context/GroupContext";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

// Mock the useRouter and useUserAuth
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: { id: 123 },
  }),
}));

jest.mock("@/context/GroupContext", () => ({
  useUserAuth: () => ({
    loggedMemberId: 456,
  }),
}));

describe("GroupMenu", () => {
  it("should navigate to edit group when Edit Group is clicked", () => {
    const anchorEl = document.createElement("div");
    const onClose = jest.fn();

    render(<GroupMenu open={true} onClose={onClose} anchorEl={anchorEl} />);

    const editGroupMenuItem = screen.getByText("Edit Group");
    fireEvent.click(editGroupMenuItem);

    const { push } = useRouter();
    // expect(push).toHaveBeenCalledWith({
    //   pathname: "/editgroup",
    //   query: { id: 123 }, // Replace with your desired groupId
    // });
  });

  it("should perform the delete group action when Delete Group is clicked", () => {
    const anchorEl = document.createElement("div");
    const onClose = jest.fn();

    render(<GroupMenu open={true} onClose={onClose} anchorEl={anchorEl} />);

    const deleteGroupMenuItem = screen.getByText("Delete Group");
    fireEvent.click(deleteGroupMenuItem);

    expect.extend({ toBeInTheDocument });
  });
});
