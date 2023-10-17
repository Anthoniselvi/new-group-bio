import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ShowAlert() {
  return (
    <Stack sx={{ width: "100%", zIndex: 9500 }} spacing={2}>
      <Alert variant="filled" severity="success">
        Deletetd Group & their Members.
      </Alert>
    </Stack>
  );
}
