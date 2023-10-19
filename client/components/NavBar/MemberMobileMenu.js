import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled, alpha } from "@mui/material/styles";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerBleeding = 56;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
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

export default function MemberMobileMenu(props) {
  const { window, open, onClose, toggleDrawer, setOpen, selectedMember } =
    props;

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const router = useRouter();
  const { id: groupId, memberId } = router.query;

  const navigateToSelectedProfilePage = () => {
    router.push({
      pathname: "/profile",
      query: { id: groupId, memberId: memberId },
    });
    setOpen(false);
  };
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
            backgroundColor: "#ffffff",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
        }}
      />

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
        <div style={{ padding: "0px 20px" }}>
          {console.log("name:" + selectedMember.name)}
          {!selectedMember.name ? (
            <></>
          ) : (
            <MenuItem
              onClick={onClose}
              disableRipple
              sx={{
                display: "flex",
                alignItems: "left",
                gap: "20px",
                borderBottom: "1px solid #e1e2e5",
                padding: "1rem 2rem",
                paddingLeft: 0,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: "#79909d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: "#ffffff",
                }}
              >
                {selectedMember.name[0]}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    color: "#1B1B18",
                    fontFamily: "Poppins",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {selectedMember.name}
                </p>

                <p
                  style={{
                    color: "#1B1B18A6",
                    fontFamily: "Poppins",
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {selectedMember.mobile}
                </p>
              </div>
            </MenuItem>
          )}
        </div>
        {/* <Divider sx={{ my: 0.5 }} /> */}
        <MenuItem
          sx={{ display: "flex", gap: "10px" }}
          onClick={navigateToSelectedProfilePage}
          disableRipple
        >
          <PersonOutlineIcon />
          Profile Settings
        </MenuItem>
        <MenuItem
          sx={{ display: "flex", gap: "10px" }}
          onClick={onClose}
          disableRipple
        >
          <LogoutIcon />
          Logout
        </MenuItem>
        {/* </StyledMenu> */}
      </SwipeableDrawer>
    </Root>
  );
}

MemberMobileMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
