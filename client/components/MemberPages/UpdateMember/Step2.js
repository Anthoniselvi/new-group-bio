import React from "react";
import TextField from "@mui/material/TextField";

const Step2 = ({ inputFieldValues, handleFieldChange, fieldErrors }) => {
  return (
    <>
      <TextField
        label="company"
        fullWidth
        margin="normal"
        value={inputFieldValues.company}
        onChange={(event) => handleFieldChange(event, "company")}
        error={Boolean(fieldErrors.company)}
        helperText={fieldErrors.company}
      />
      <TextField
        label="designation"
        fullWidth
        margin="normal"
        value={inputFieldValues.designation}
        onChange={(event) => handleFieldChange(event, "designation")}
        error={Boolean(fieldErrors.designation)}
        helperText={fieldErrors.designation}
      />
      <TextField
        label="industry"
        value={inputFieldValues.industry}
        onChange={(event) => handleFieldChange(event, "industry")}
        fullWidth
        margin="normal"
        error={Boolean(fieldErrors.industry)}
        helperText={fieldErrors.industry}
      />
      <TextField
        label="offers"
        fullWidth
        margin="normal"
        value={inputFieldValues.offers}
        onChange={(event) => handleFieldChange(event, "offers")}
        error={Boolean(fieldErrors.offers)}
        helperText={fieldErrors.offers}
      />
    </>
  );
};

export default Step2;
