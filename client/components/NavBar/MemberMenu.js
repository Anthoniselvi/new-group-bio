import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

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

export default function MemberMenu({ open, onClose, anchorEl, handleLogout }) {
  const [selectedMember, setSelectedMember] = useState({});
  const router = useRouter();
  const { id: groupId, memberId } = router.query;

  const navigateToSelectedProfilePage = () => {
    router.push({
      pathname: "/profile",
      query: { id: groupId, memberId: memberId },
    });
    onClose();
  };
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/member/${memberId}`)
      .then((response) => {
        setSelectedMember(response.data);
        console.log(
          "selected member in form: " + JSON.stringify(response.data)
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [memberId]);
  return (
    <div>
      <StyledMenu
        sx={{ padding: "20px" }}
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
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

                {/* <p
                  style={{
                    color: "#1B1B18A6",
                    fontFamily: "Poppins",
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {selectedMember.mobile}
                </p> */}
              </div>
            </MenuItem>
          )}
        </div>
        {console.log("name:" + selectedMember.name)}
        {selectedMember.name && (
          <MenuItem onClick={navigateToSelectedProfilePage} disableRipple>
            <PersonOutlineIcon />
            Profile Settings
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout} disableRipple>
          <LogoutIcon />
          Logout
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
