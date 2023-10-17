// steps.js

export const steps = (selectedGroup) => [
  {
    label: "Personal Information",
    mandatoryFields:
      selectedGroup.groupType === "0"
        ? ["name", "location", "course", "year"]
        : ["name", "location"],
    fields: [
      {
        label: "name",
        value: "",
      },
      {
        label: "location",
        value: "",
      },
      {
        label: "course",
        value: "",
      },
      {
        label: "year",
        value: "",
      },
    ],
  },

  {
    label: "Business Information",
    status: "4 fields left",
    mandatoryFields: ["company", "designation", "industry", "offers"],
    fields: [
      {
        label: "company",
        value: "",
      },
      {
        label: "designation",
        value: "",
      },
      {
        label: "industry",
        value: "",
      },
      {
        label: "offers",
        value: "",
      },
    ],
  },
  {
    label: "Social Media",
    status: "2 fields left",
    mandatoryFields: ["linkedin", "website"],
    fields: [
      {
        label: "linkedin",
        value: "",
      },
      {
        label: "website",
        value: "",
      },
    ],
  },
];
