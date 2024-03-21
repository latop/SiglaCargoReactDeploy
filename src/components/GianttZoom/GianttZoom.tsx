import React from "react";
import { useGianttZoom } from "./useGianttZoom";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "dayjs/locale/pt-br";

export function GianttZoom() {
  const { zoom, handleChangeZoom } = useGianttZoom();

  return (
    <ToggleButtonGroup
      color="primary"
      value={zoom}
      exclusive
      onChange={handleChangeZoom}
      aria-label="Platform"
    >
      <ToggleButton value="1" size="small">
        1 dia
      </ToggleButton>
      <ToggleButton value="3" size="small">
        3 dias
      </ToggleButton>
      <ToggleButton value="7" size="small">
        7 dias
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
