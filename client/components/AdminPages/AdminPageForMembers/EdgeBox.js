import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Avatar from "@mui/material/Avatar";
import { CloseOutlined } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function EdgeBox(props) {
  const { window, open, toggleDrawer, profile } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: "visible",
            backgroundColor: "transparent",
          },
        }}
      />
      {/* <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box> */}
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            // px: 2,
            pb: 2,
            pt: 2,
            height: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderTopRightRadius: "20px",
            borderTopLeftRadius: "20px",
          }}
        >
          <CloseOutlined
            onClick={toggleDrawer(false)}
            style={{ marginLeft: "80%" }}
          />
          {profile.image ? (
            <Avatar
              alt="Remy Sharp"
              src={profile.image}
              sx={{
                width: "80px",
                height: "80px",
              }}
            />
          ) : (
            <div
              style={{
                width: "80px",
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#00b4d8",
                borderRadius: "50%",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}
          <Typography
            sx={{
              color: "#333333",
              fontFamily: "Poppins",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {profile.name}
          </Typography>
          <Typography
            sx={{
              color: "#333333",
              fontFamily: "Poppins",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {profile.mobile}
          </Typography>
          <div style={{ display: "flex", gap: "20px" }}>
            <LinkedInIcon style={{ cursor: "pointer" }} />
            <LinkIcon style={{ cursor: "pointer" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              gap: "10px",
              paddingTop: "20px",
              paddingLeft: "20px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                fontFamily: "Poppins",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Bio
            </Typography>
            {profile.course && (
              <Typography
                sx={{
                  color: "#333333",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {profile.course}
              </Typography>
            )}
            {profile.year && (
              <Typography
                sx={{
                  color: "#333333",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {profile.year}
              </Typography>
            )}
            <Typography
              sx={{
                color: "#333333",
                fontFamily: "Poppins",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {profile.company}
            </Typography>
            <Typography
              sx={{
                color: "#333333",
                fontFamily: "Poppins",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {profile.designation}
            </Typography>
            <Typography
              sx={{
                color: "#333333",
                fontFamily: "Poppins",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {profile.location}
            </Typography>
            <Typography
              sx={{
                color: "#000000",
                fontFamily: "Poppins",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {profile.industry}
            </Typography>
            <Typography
              sx={{
                color: "#75777A",
                fontFamily: "Poppins",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Services Offered: <br />
              {profile.offers}
              {/* {profile.offers.split(" ").map((word, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#e1e2e5",
                    borderRadius: "4px",
                    marginRight: "10px",
                    padding: "0 2px",
                    display: "inline",
                  }}
                >
                  {word}{" "}
                </span>
              ))} */}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              transform: "translateY(0)",
              transition: "transform 0.3s ease",
              position: "fixed",
              backgroundColor: "#fff",
              width: "100%",
              bottom: 0,
              height: "10%",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "0 20px",
              // backgroundColor: "#FBC91B",
            }}
          >
            <a
              href={`https://wa.me/${profile.mobile}`}
              target="_blank"
              style={{
                backgroundColor: "#29ad17",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "50%",
                color: "#222222",
                padding: "10px",
              }}
            >
              <WhatsAppIcon />
            </a>
            <a
              href={`tel:+91${profile.mobile}`}
              target="_blank"
              style={{
                backgroundColor: "#0673ef",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "50%",
                color: "#222222",
                padding: "10px",
                textTransform: "none",
              }}
            >
              <CallIcon />
            </a>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

EdgeBox.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
