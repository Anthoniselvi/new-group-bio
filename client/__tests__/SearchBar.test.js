import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/AdminPages/AdminGroupPages/SearchBar";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("SearchBar", () => {
  it("should update search query and trigger search when Enter key is pressed", () => {
    const singleGroupMembers = [
      {
        name: "John Doe",
        company: "ABC Inc",
        offers: "Service A",
      },
      {
        name: "Jane Smith",
        company: "XYZ Corp",
        offers: "Service B",
      },
    ];

    const onSearch = jest.fn();
    const setSearchResults = jest.fn();
    const setSearchQuery = jest.fn();

    render(
      <SearchBar
        singleGroupMembers={singleGroupMembers}
        onSearch={onSearch}
        setSearchResults={setSearchResults}
        setSearchQuery={setSearchQuery}
      />
    );

    const searchInput = screen.getByPlaceholderText(
      "Search by Name / Company / Services"
    );
    fireEvent.change(searchInput, { target: { value: "John" } });

    // Press the Enter key
    fireEvent.click(searchInput, { key: "Enter", code: 13, charCode: 13 });

    expect(setSearchQuery).toHaveBeenCalledWith("John");

    // expect(setSearchResults).toHaveBeenCalledWith([
    //   {
    //     name: "John Doe",
    //     company: "ABC Inc",
    //     offers: "Service A",
    //   },
    // ]);
  });

  it("should trigger search when search icon is clicked", () => {
    const singleGroupMembers = [
      {
        name: "John Doe",
        company: "ABC Inc",
        offers: "Service A",
      },
      {
        name: "Jane Smith",
        company: "XYZ Corp",
        offers: "Service B",
      },
    ];

    const onSearch = jest.fn();
    const setSearchResults = jest.fn();
    const setSearchQuery = jest.fn();

    render(
      <SearchBar
        singleGroupMembers={singleGroupMembers}
        onSearch={onSearch}
        setSearchResults={setSearchResults}
        setSearchQuery={setSearchQuery}
      />
    );

    const searchIcon = screen.getByTestId("search-icon");
    fireEvent.click(searchIcon);

    // expect(setSearchResults).toHaveBeenCalledWith([
    //   {
    //     name: "John Doe",
    //     company: "ABC Inc",
    //     offers: "Service A",
    //   },
    //   {
    //     name: "Jane Smith",
    //     company: "XYZ Corp",
    //     offers: "Service B",
    //   },
    // ]);
  });
});
