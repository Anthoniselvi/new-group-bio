import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

export default function DeleteGroup({ onDeleteGroup }) {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Delete Group
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div>
              <Typography sx={{ p: 2 }}>
                Are you sure you want to delete this group?
              </Typography>
              <Button onClick={onDeleteGroup} variant="contained" color="error">
                Confirm Delete
              </Button>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
