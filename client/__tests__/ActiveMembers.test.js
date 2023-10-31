import React from "react";
import { render, screen } from "@testing-library/react";
import ActiveMembers from "@/components/AdminPages/AdminPageForMembers/ActiveMembers";
import {
  toBeInTheDocument,
  toHaveValue,
} from "@testing-library/jest-dom/matchers";

const sampleData = [
  {
    name: "John Doe",
    course: "Computer Science(2023)",
    year: 2023,
    image: "john-doe.jpg",
    designation: "Software Engineer",
    company: "Tech Corp",
    location: "New York",
    offers: "3 Job Offers",
    profileId: 1,
  },
  {
    name: "",
    // Add more sample data for cases with empty names
  },
];

describe("ActiveMembers", () => {
  it("renders non-empty members", () => {
    render(
      <ActiveMembers
        singleGroup={sampleData}
        selectedGroup={{ groupType: "0" }}
      />
    );

    const testName = screen.getByText("John Doe");
    // const testCompany = screen.getByText("Tech Corp");

    // Ensure that non-empty member data is displayed
    expect.extend({ toBeInTheDocument });
    // expect(testCompany).toBeInTheDocument();
    // expect(screen.getByText("Computer Science (2023)")).toBeInTheDocument();
    // Add more assertions for other fields as needed
  });

  //   it("displays a message when there are no non-empty members", () => {
  //     render(
  //       <ActiveMembers
  //         singleGroup={sampleData}
  //         selectedGroup={{ groupType: "0" }}
  //       />
  //     );

  //     // Ensure that the "No Updated Members" message is displayed
  //     expect(screen.getByText("No Updated Members")).toBeInTheDocument();
  //   });

  // Add more test cases for different scenarios, such as cases with empty names, etc.
});
