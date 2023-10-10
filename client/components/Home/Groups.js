import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaLink } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 18,
          fontWeight: 600,
          color: "#000000",
        }}
        component="div"
      >
        Group Name
      </Typography>
      <Typography
        sx={{ fontFamily: "Poppins", color: "#75777A", fontSize: 16 }}
      >
        Group Description
      </Typography>
      <Typography
        sx={{ fontFamily: "Poppins", fontSize: 20, color: "#000000" }}
      >
        Active -
        <br />
        Pending -
      </Typography>
    </CardContent>
    <CardActions
      sx={{
        display: "flex",
        gap: "1rem",
        backgroundColor: "#F8F8F7",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Button
        size="small"
        sx={{
          fontFamily: "Poppins",
          fontSize: 14,
          color: "#F5F5F5",
          backgroundColor: "#222220",
          padding: "5px 25px",
          borderRadius: "20px",
          textTransform: "none",
          display: "flex",
          gap: 1,
          "&:hover": {
            backgroundColor: "#222220",
          },
        }}
      >
        <FaLink /> Invitation Link
      </Button>
      <Button
        size="small"
        sx={{
          fontFamily: "Poppins",
          fontSize: 14,
          color: "#1B1B18",
          backgroundColor: "#ffffff",
          padding: "5px 25px",
          borderRadius: "20px",
          textTransform: "none",
          display: "flex",
          gap: 1,
          border: "0.5px solid #e1e2e5",
        }}
      >
        Open <HiOutlineExternalLink style={{ fontSize: 20 }} />
      </Button>
    </CardActions>
  </React.Fragment>
);

export default function Groups() {
  return (
    <Box
      sx={{
        minWidth: 275,
        display: "flex",
        flexDirection: "column",
        gap: "2rem",

        "& .MuiCard-root": {
          borderRadius: 3,
        },
      }}
    >
      <Typography sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}>
        Groups
      </Typography>
      <Card variant="outlined" padding="1rem">
        {card}
      </Card>
    </Box>
  );
}
