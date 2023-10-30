import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteGroup from "@/components/AdminPages/AdminGroupPages/DeleteGroup";
import {
  toBeInTheDocument,
  toHaveValue,
} from "@testing-library/jest-dom/matchers";

describe("DeleteGroup", () => {
  it("should open the confirmation popover and trigger onDeleteGroup when confirm is clicked", () => {
    const onDeleteGroup = jest.fn();

    render(<DeleteGroup onDeleteGroup={onDeleteGroup} />);

    const deleteGroupButton = screen.getByText("Delete Group");
    fireEvent.click(deleteGroupButton);

    const confirmationText = screen.getByText(
      "Are you sure you want to delete this group?"
    );

    const confirmDeleteButton = screen.getByText("Confirm Delete");
    fireEvent.click(confirmDeleteButton);

    expect(onDeleteGroup).toHaveBeenCalled();

    expect.extend({ toBeInTheDocument });
  });
});
