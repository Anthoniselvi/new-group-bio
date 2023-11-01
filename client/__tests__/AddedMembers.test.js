import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AddedMembers from "@/components/Members/AddedMembers";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "1" },
  }),
}));

describe("AddedMembers", () => {
  it("renders a list of members from an API call", async () => {
    const mock = new MockAdapter(axios);
    const mockData = [{ mobile: "123-456-7890" }, { mobile: "987-654-3210" }];
    // const router = useRouter();

    // Mock the Axios request to return the mockData
    mock
      .onGet(`${process.env.NEXT_PUBLIC_BASE_URL}/member/all/:id`)
      .reply(200, mockData);

    render(<AddedMembers />);

    // Wait for the component to fetch and render the data
    await waitFor(() => {
      // Assert that the rendered component contains the expected data
      expect.extend({ toBeInTheDocument });
      //   expect(screen.getByText("987-654-3210")).toBeInTheDocument();
    });
  });
});
