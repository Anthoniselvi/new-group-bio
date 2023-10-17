import * as React from "react";
import { useState } from "react";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import { useUserAuth } from "@/context/GroupContext";
import { DeleteOutline, ShareOutlined } from "@mui/icons-material";
import ShowAlert from "./ShowAlert";
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
      padding: "5px 10px",
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

export default function SingleGroupMenu({ open, onClose, anchorEl }) {
  const router = useRouter();
  const { id } = router.query;
  const [alertVisible, setAlertVisible] = useState(false);
  const handleDelete = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/group/${id}`)

      .then((response) => {
        console.log("deleteGroup :" + JSON.stringify(response.data));
        setAlertVisible(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return <ShowAlert />;
  };
  return (
    <div style={{ padding: "10px" }}>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
      >
        <MenuItem
          onClick={onClose}
          disableRipple
          sx={{ borderBottom: "2px solid #e2e2df" }}
        >
          <EditIcon />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteOutline />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
