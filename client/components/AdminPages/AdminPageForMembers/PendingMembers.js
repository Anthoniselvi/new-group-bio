import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "mobile",
    headerName: "Mobile Number",
    width: 150,
    editable: true,
  },
];

export default function PendingMembers({ singleGroup }) {
  console.log("singleGroupMembers: " + JSON.stringify(singleGroup));
  if (!singleGroup || !Array.isArray(singleGroup)) {
    return (
      <Box>
        <p>No data available.</p>
      </Box>
    );
  }

  const rows = singleGroup
    .filter((singleMember) => singleMember.name === "")
    .map((singleMember, index) => ({
      id: index + 1,
      mobile: singleMember.mobile,
    }));

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
