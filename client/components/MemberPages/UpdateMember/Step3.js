import React from "react";
import TextField from "@mui/material/TextField";

const Step3 = ({ inputFieldValues, handleFieldChange, fieldErrors }) => {
  return (
    <>
      <TextField
        label="linkedIn"
        fullWidth
        margin="normal"
        value={inputFieldValues.linkedin}
        onChange={(event) => handleFieldChange(event, "linkedin")}
        error={Boolean(fieldErrors.linkedin)}
        helperText={fieldErrors.linkedin}
      />
      <TextField
        label="website"
        fullWidth
        margin="normal"
        value={inputFieldValues.website}
        onChange={(event) => handleFieldChange(event, "website")}
        error={Boolean(fieldErrors.website)}
        helperText={fieldErrors.website}
      />
    </>
  );
};

export default Step3;
