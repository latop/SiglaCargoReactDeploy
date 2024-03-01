import React from "react";
import dayjs from "dayjs";
import { useGiantt } from "@/hooks/useGiantt";

enum Zoom {
  OneDay = "1",
  ThreeDays = "3",
  SevenDays = "7",
}

const setEndDate = (startDate: string | null, zoom: Zoom) => {
  return dayjs(startDate).add(2, "hour").add(Number(zoom), "day").toDate();
};

const setStartDate = (startDate: string | null) => {
  return dayjs(startDate).add(-2, "hour").toDate();
};

export function useGianttZoom() {
  const {
    visibleTimeEnd,
    startDate,
    visibleTimeStart,
    setVisibleTimeEnd,
    setVisibleTimeStart,
  } = useGiantt();

  const differenceInDays = dayjs(visibleTimeEnd).diff(
    dayjs(visibleTimeStart),
    "day",
  );

  const handleChangeZoom = (
    event: React.MouseEvent<HTMLElement>,
    newZoom: Zoom,
  ) => {
    if (newZoom) {
      setVisibleTimeStart(setStartDate(startDate));
      setVisibleTimeEnd(setEndDate(startDate, newZoom as Zoom));
    }
  };

  return {
    visibleTimeStart,
    visibleTimeEnd,
    handleChangeZoom,
    zoom: String(differenceInDays) as Zoom,
  };
}
