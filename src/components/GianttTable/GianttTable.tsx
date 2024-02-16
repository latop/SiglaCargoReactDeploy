import { useMemo } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { Trip } from "@/interfaces/schedule";
import dayjs from "dayjs";

export function GianttTable({ trips }: { trips: Trip[] }) {
  const { groups, items } = useMemo(() => {
    const groupsMap = new Map();
    const itemsMap = new Map();

    trips.slice(0, 100).forEach((trip: Trip) => {
      if (!groupsMap.has(trip.driverId)) {
        groupsMap.set(trip.driverId, {
          id: trip.driverId,
          title: trip.driverName,
        });
      }
    });

    trips.slice(0, 100).forEach((trip: Trip) => {
      itemsMap.set(trip.id, {
        id: trip.id,
        group: trip.driverId,
        title: trip.code,
        start_time: dayjs(trip.plannedStart, "YYYY-MM-DDTHH:mm:ss"),
        end_time: dayjs(trip.plannedStop, "YYYY-MM-DDTHH:mm:ss"),
      });
    });

    return {
      groups: Array.from(groupsMap.values()),
      items: Array.from(itemsMap.values()),
    };
  }, [trips]);

  return (
    <Timeline
      lineHeight={50}
      groups={groups}
      items={items}
      defaultTimeStart={dayjs().add(-12, "hour").toDate()}
      defaultTimeEnd={dayjs().add(12, "hour").toDate()}
    />
  );
}
