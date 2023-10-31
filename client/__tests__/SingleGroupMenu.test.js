import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SingleGroupMenu from "@/components/AdminPages/AdminGroupPages/SingleGroupMenu";
import axios from "axios";
import { useRouter } from "next/router";

// Mock axios and useRouter
jest.mock("axios");

describe("SingleGroupMenu", () => {
  it("should call the delete API and show an alert when Delete is clicked", async () => {
    const onClose = jest.fn();
    const anchorEl = document.createElement("div");

    // Clear axios mock implementation
    axios.delete.mockClear();

    //     // Mock the router query
    jest.mock("next/router", () => ({
      useRouter: () => ({
        query: { id: "123" },
      }),
    }));

    render(
      <SingleGroupMenu open={true} onClose={onClose} anchorEl={anchorEl} />
    );

    // Find the "Delete" menu item and click it
    const deleteMenuItem = screen.getByText("Delete");
    fireEvent.click(deleteMenuItem);

    // Expect that axios.delete is called with the correct URL
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BASE_URL}/group/123`
    );

    axios.delete.mockResolvedValue({ data: "Group deleted successfully" });

    // Wait for the alert to be visible
    await waitFor(() => {
      expect(
        screen.getByText("Group deleted successfully")
      ).toBeInTheDocument();
    });
  });
});
// import React from "react";
// import { render, fireEvent, waitFor } from "@testing-library/react";
// import SingleGroupMenu from "@/components/AdminPages/AdminGroupPages/SingleGroupMenu";

// // Mock axios
// jest.mock("axios");

// describe("SingleGroupMenu", () => {
//   it("should call the delete API and show an alert when Delete is clicked", async () => {
//     const onClose = jest.fn();
//     const anchorEl = document.createElement("div");

//     // Mock the useRouter's query
//     jest.mock("next/router", () => ({
//       useRouter: () => ({
//         query: { id: "123" },
//       }),
//     }));

//     // Render the component
//     render(
//       <SingleGroupMenu open={true} onClose={onClose} anchorEl={anchorEl} />
//     );

//     // Find and click the "Delete" menu item
//     const deleteMenuItem = getByText("Delete");
//     fireEvent.click(deleteMenuItem);

//     // Expect that axios.delete is called with the correct URL
//     await waitFor(() => {
//       expect(axios.delete).toHaveBeenCalledWith(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/group/123`
//       );
//     });

//     // Expect that the alert is shown
//     const alert = getByText("Group deleted successfully");
//     expect(alert).toBeInTheDocument();
//   });
// });
