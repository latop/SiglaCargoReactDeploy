import { useMemo } from "react";
import { DriverSchedule, Trip } from "@/interfaces/schedule";
import dayjs from "dayjs";

export function useGianttTable({
  trips,
  drivers,
}: {
  trips: Trip[];
  drivers: DriverSchedule[];
}) {
  const { groups, items } = useMemo(() => {
    const groupsMap = new Map();
    const itemsMap = new Map();
    drivers.forEach((driver: DriverSchedule) => {
      if (!groupsMap.has(driver.driverId)) {
        groupsMap.set(driver.driverId, {
          id: driver.driverId,
          title: driver.driverName,
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
