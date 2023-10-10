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

const rows = [
  { id: 1, mobile: "2233445566" },
  { id: 2, mobile: "2345678910" },
  { id: 3, mobile: "4433225511" },
  { id: 4, mobile: "9988776655" },
  { id: 5, mobile: "8765432190" },
  { id: 6, mobile: "5678432109" },
  { id: 7, mobile: "4567876902" },
  { id: 8, mobile: "4466889922" },
  { id: 9, mobile: "1234567890" },
];

export default function PendingMembers() {
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
