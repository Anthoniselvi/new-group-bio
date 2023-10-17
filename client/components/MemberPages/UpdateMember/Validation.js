export const validateStep1 = (values, selectedGroupType) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.course && selectedGroupType === "0") {
    errors.course = "Course is required";
  }
  if (!values.year && selectedGroupType === "0") {
    errors.year = "Year is required";
  }
  if (!values.location) {
    errors.location = "Location is required";
  }

  return errors;
};

export const validateStep2 = (values) => {
  const errors = {};

  if (!values.company) {
    errors.company = "Company Name is required";
  }
  if (!values.designation) {
    errors.designation = "Designation is required";
  }
  if (!values.industry) {
    errors.industry = "Industry is required";
  }
  if (!values.offers) {
    errors.offers = "Offers is required";
  }

  return errors;
};

export const validateStep3 = (values) => {
  const errors = {};

  if (!values.linkedin) {
    errors.linkedin = "Linkedin is required";
  }
  if (!values.website) {
    errors.website = "Website is required";
  }

  return errors;
};
