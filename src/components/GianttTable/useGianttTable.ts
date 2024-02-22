import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DriverSchedule, Trip } from "@/interfaces/schedule";
import dayjs from "dayjs";
import { match } from "ts-pattern";

enum Zoom {
  OneDay = "1",
  ThreeDay = "3",
  SevenDay = "7",
}

export function useGianttTable({
  trips,
  drivers,
}: {
  trips: Trip[];
  drivers: DriverSchedule[];
}) {
  const params = useSearchParams();
  const startDate = params.get("startDate");
  const [visibleTimeStart, setVisibleTimeStart] = useState<Date>(
    dayjs(startDate).toDate(),
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState<Date>(
    dayjs(startDate).add(Number(Zoom.SevenDay), "day").toDate(),
  );

  const handleTimeChange = (
    visibleTimeStart: number,
    visibleTimeEnd: number,
  ) => {
    const start = dayjs(visibleTimeStart).toDate();
    const end = dayjs(visibleTimeEnd).toDate();
    setVisibleTimeStart(start);
    setVisibleTimeEnd(end);
  };

  const differenceInDays = dayjs(visibleTimeEnd).diff(
    dayjs(visibleTimeStart),
    "day",
  );

  const zoom = match(differenceInDays)
    .with(1, () => Zoom.OneDay)
    .with(3, () => Zoom.ThreeDay)
    .with(7, () => Zoom.SevenDay)
    .otherwise(() => undefined);

  const handleChangeZoom = (
    event: React.MouseEvent<HTMLElement>,
    newZoom: Zoom,
  ) => {
    if (newZoom) {
      setVisibleTimeStart(dayjs(startDate).toDate());
      setVisibleTimeEnd(dayjs(startDate).add(Number(newZoom), "day").toDate());
    }
  };

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

  return {
    groups,
    items,
    visibleTimeStart,
    visibleTimeEnd,
    handleTimeChange,
    handleChangeZoom,
    zoom,
  };
}
