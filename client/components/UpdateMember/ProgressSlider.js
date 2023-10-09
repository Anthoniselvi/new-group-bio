import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 40,
    label: "40%",
  },
  {
    value: 80,
    label: "80%",
  },
  {
    value: 100,
    label: "100%",
  },
];

function valuetext(value) {
  return `${value}%`;
}

export default function ProgressSlider({ progressPercentage }) {
  return (
    <Box sx={{ width: "100% " }}>
      <Slider
        // aria-label="Always visible"
        value={progressPercentage}
        getAriaValueText={valuetext}
        step={10}
        sx={{
          height: 10,
          color: "#4361ee",
        }}
        // marks={marks}
        // valueLabelDisplay="on"
      />
    </Box>
  );
}
