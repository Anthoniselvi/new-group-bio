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
            height: `calc(70% - ${drawerBleeding}px)`,
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
        {/* <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: "10px",
            }}
          >
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              Profile Details
            </Typography>
            <CloseOutlined onClick={toggleDrawer(false)} />
          </div>
        </StyledBox> */}
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
          <div>
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
            </Typography>
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
