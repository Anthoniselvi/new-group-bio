import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import styles from "@/styles/Search.module.css";
const SearchedMembers = ({ searchResults }) => {
  console.log(
    "searchResults in searchedMembers:" + JSON.stringify(searchResults)
  );
  const getFirstLetterCapital = (name) => {
    return name.charAt(0).toUpperCase();
  };
  return (
    <div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <KeyboardBackspaceIcon
          style={{ cursor: "pointer" }}
          //   onClick={navigateToAllProfiles}
        />
        Results for {searchResults}
        <strong></strong>
      </div>

      {searchResults.map((item) => (
        <Card
          key={item.memberId}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 1px 5px 1px #90e0ef",
            padding: "1em",
            paddingTop: 0,
            paddingBottom: 0,
          }}
          // onClick={() => navigateToSingleProfile(item)}
        >
          {item.image ? (
            <img
              src={item.image}
              alt="Profile"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
              }}
            />
          ) : (
            <div className={styles.nameInitial}>
              <p className={styles.firstletter}>
                {getFirstLetterCapital(item.name)}
              </p>
            </div>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "top",
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
                padding: 0,
                paddingLeft: "1em",
                paddingTop: "1em",
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontFamily: "Sans-serif",
                  fontSize: "17px",
                  fontWeight: 600,
                }}
              >
                {item.name}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Sans-serif",
                  fontSize: "14px",
                  color: "#999999",
                }}
                component="div"
              >
                {item.designation}, {item.company}
                <br />
                {item.location}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Sans-serif",
                  fontSize: "14px",
                  color: "#000000",
                }}
                component="div"
              >
                Services Offered: <br />
                {item.offers}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </div>
  );
};

export default SearchedMembers;
