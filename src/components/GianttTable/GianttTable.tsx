import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { Trip } from "@/interfaces/schedule";
import { useGianttTable } from "./useGianttTable";

export function GianttTable({ trips }: { trips: Trip[] }) {
  const { groups, items, defaultTimeStart, defaultTimeEnd } =
    useGianttTable(trips);

  return (
    <Timeline
      lineHeight={50}
      groups={groups}
      items={items}
      defaultTimeStart={defaultTimeStart}
      defaultTimeEnd={defaultTimeEnd}
    />
  );
}
