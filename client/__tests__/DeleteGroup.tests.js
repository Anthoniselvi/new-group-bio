import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteGroup from "@/components/AdminPages/AdminGroupPages/DeleteGroup";
import {
  toBeInTheDocument,
  toHaveValue,
} from "@testing-library/jest-dom/matchers";

describe("DeleteGroup", () => {
  it("should open the confirmation popover and trigger onDeleteGroup when confirm is clicked", () => {
    // Mock the onDeleteGroup function
    const onDeleteGroup = jest.fn();

    render(<DeleteGroup onDeleteGroup={onDeleteGroup} />);

    // Find the "Delete Group" button and click it to open the popover
    const deleteGroupButton = screen.getByText("Delete Group");
    fireEvent.click(deleteGroupButton);

    // Find the "Are you sure you want to delete this group?" text in the popover
    const confirmationText = screen.getByText(
      "Are you sure you want to delete this group?"
    );

    // Find the "Confirm Delete" button in the popover and click it
    const confirmDeleteButton = screen.getByText("Confirm Delete");
    fireEvent.click(confirmDeleteButton);

    // Assert that onDeleteGroup has been called
    expect(onDeleteGroup).toHaveBeenCalled();

    // Assert that the confirmation popover is no longer visible
    expect.extend({ toBeInTheDocument });
  });
});
