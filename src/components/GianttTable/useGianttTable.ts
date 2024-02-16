import { useMemo } from "react";
import { Trip } from "@/interfaces/schedule";
import dayjs from "dayjs";

export function useGianttTable(trips: Trip[]) {
  const { groups, items } = useMemo(() => {
    const groupsMap = new Map();
    const itemsMap = new Map();

    trips.forEach((trip: Trip) => {
      if (!groupsMap.has(trip.driverId)) {
        groupsMap.set(trip.driverId, {
          id: trip.driverId,
          title: trip.driverName,
        });
      }
    });

    trips.forEach((trip: Trip) => {
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

  const defaultTimeStart = dayjs().add(-12, "hour").toDate();
  const defaultTimeEnd = dayjs().add(12, "hour").toDate();

  return { groups, items, defaultTimeStart, defaultTimeEnd };
}
