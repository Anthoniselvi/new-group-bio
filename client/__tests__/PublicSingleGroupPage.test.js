// PublicSingleGroupPage.test.js

import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PublicSingleGroupPage from "@/components/AdminPages/AdminGroupPages/PubicSingleGroupPage";

// Create a new instance of axios-mock-adapter
const mock = new MockAdapter(axios);

// Mock axios responses
mock
  .onGet(`${process.env.NEXT_PUBLIC_BASE_URL}/group/single/:groupId`)
  .reply(200, { groupName: "Mock Group" });
mock
  .onGet(`${process.env.NEXT_PUBLIC_BASE_URL}/member/all/:groupId`)
  .reply(200, [{ name: "Member 1" }, { name: "Member 2" }]);

describe("PublicSingleGroupPage", () => {
  it("renders loading text and then group data", async () => {
    render(<PublicSingleGroupPage />);

    // Ensure that the loading text is displayed initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the component to fetch and render the group data
    await waitFor(() => {
      expect(screen.getByText("Mock Group")).toBeInTheDocument();
    });
  });
});
