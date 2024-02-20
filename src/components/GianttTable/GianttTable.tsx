import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { DriverSchedule, Trip } from "@/interfaces/schedule";
import { useGianttTable } from "./useGianttTable";
import { Box } from "@mui/material";
import "./GianttTable.css";
import "dayjs/locale/pt-br";

export function GianttTable({
  trips,
  drivers,
}: {
  trips: Trip[];
  drivers: DriverSchedule[];
}) {
  const { groups, items, defaultTimeStart, defaultTimeEnd } = useGianttTable({
    trips,
    drivers,
  });

  return (
    <Box>
      <Timeline
        lineHeight={50}
        groups={groups}
        items={items}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
      />
    </Box>
  );
}
