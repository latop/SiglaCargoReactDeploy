import React from "react";
import dayjs from "dayjs";
import { match } from "ts-pattern";
import { useGiantt } from "@/hooks/useGiantt";
enum Zoom {
  OneDay = "1",
  ThreeDays = "3",
  SevenDays = "7",
}

// Funções para manipular datas
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

  const zoom = match(differenceInDays)
    .with(1, () => Zoom.OneDay)
    .with(3, () => Zoom.ThreeDays)
    .with(7, () => Zoom.SevenDays)
    .otherwise(() => undefined);

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
    zoom,
  };
}
