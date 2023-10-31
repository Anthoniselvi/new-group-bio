import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

export default function PendingMembersTable({ singleGroup }) {
  // console.log("singleGroupMembers: " + JSON.stringify(singleGroup));
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 275 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Mobile Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell width="50px">{row.id}</TableCell>
              <TableCell>{row.mobile}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
