import { useMemo } from "react";
import { useGiantt } from "@/hooks/useGiantt";
import { DailyTrip, DailyTripSection } from "@/interfaces/schedule";
import { Unit } from "react-calendar-timeline";
import dayjs from "dayjs";
import { match } from "ts-pattern";
import { useHash } from "@/hooks/useHash";

export function useTimelineTripsUnallocated(tripsUnallocated: DailyTrip[]) {
  const [, setHash] = useHash();
  const {
    visibleTimeEnd,
    visibleTimeStart,
    setVisibleTimeStart,
    setVisibleTimeEnd,
  } = useGiantt();

  const handleLabelFormatItem = (
    [startTime]: [Date],
    unit: Unit,
    labelWidth: number,
  ) => {
    const options = match<Unit, Intl.DateTimeFormatOptions>(unit)
      .with("hour", () => ({ hour: "numeric" }))
      .with("day", () =>
        labelWidth < 100
          ? { day: "numeric" }
          : {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            },
      )
      .with("month", () => ({ year: "numeric", month: "short" }))
      .with("minute", () => ({ minute: "numeric" }))
      .otherwise(() => ({
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }));

    const formatPtBR = new Intl.DateTimeFormat("pt-BR", options);
    return formatPtBR.format(startTime);
  };

  const handleDoubleClick = (itemId: string) => {
    const hash = `journeyDetails-${itemId}`;
    setHash(hash);
  };

  const handleLabelFormatHeader = ([startTime]: Date[], unit: Unit) => {
    const options = match<Unit, Intl.DateTimeFormatOptions>(unit)
      .with("year", () => ({ year: "numeric" }))
      .with("day", () => ({
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      }))
      .otherwise(() => ({ year: "numeric", month: "long" }));

    const formatPtBR = new Intl.DateTimeFormat("pt-BR", options);
    return formatPtBR.format(startTime);
  };

  const handleTimeChange = (
    visibleTimeStart: number,
    visibleTimeEnd: number,
  ) => {
    const start = dayjs(visibleTimeStart).toDate();
    const end = dayjs(visibleTimeEnd).toDate();
    setVisibleTimeStart(start);
    setVisibleTimeEnd(end);
  };

  const { groups, items } = useMemo(() => {
    const groupsMap = new Map();
    const itemsMap = new Map();

    tripsUnallocated.forEach((trip: DailyTrip) => {
      if (!groupsMap.has(trip.dailyTripId)) {
        groupsMap.set(trip.dailyTripId, {
          id: trip.dailyTripId,
          title: trip.sto,
        });
      }
    });

    tripsUnallocated.forEach((trip) => {
      trip.sectionsUnallocated.forEach((section: DailyTripSection) => {
        itemsMap.set(section.dailyTripSectionId, {
          id: section.dailyTripSectionId,
          group: section.dailyTripId,
          title: section.dailyTripSectionId,
          start_time: dayjs(section.startPlanned, "YYYY-MM-DDTHH:mm:ss"),
          end_time: dayjs(section.endPlanned, "YYYY-MM-DDTHH:mm:ss"),
        });
      });
    });

    return {
      groups: Array.from(groupsMap.values()),
      items: Array.from(itemsMap.values()),
    };
  }, [tripsUnallocated]);

  // const handleMoveItem = (
  //   itemId: string,
  //   dragTime: number,
  //   newGroupOrder: number,
  // ) => {
  //   if (!trips || !drivers) return;
  //   const newDriver = drivers?.[newGroupOrder];

  //   const tripIndex = trips?.findIndex((trip) => trip.id === itemId);

  //   if (tripIndex !== undefined && tripIndex >= 0) {
  //     const currentTrip = trips[tripIndex];
  //     const difference = dayjs(currentTrip.endPlanned).diff(
  //       currentTrip.startPlanned,
  //     );
  //     const newEndPlanned = dayjs(dragTime).add(difference, "millisecond");
  //     const startPlanned = dayjs(dragTime).format("YYYY-MM-DDTHH:mm:ss");
  //     const endPlanned = newEndPlanned.format("YYYY-MM-DDTHH:mm:ss");

  //     updatedTrip({
  //       tripId: itemId,
  //       newStartPlanned: startPlanned,
  //       newEndPlanned: endPlanned,
  //       newDriverId: newDriver.driverId,
  //     });
  //     addToast("Viagem movida com sucesso.", { type: "success" });
  //   }
  // };

  return {
    groups,
    items,
    visibleTimeStart,
    visibleTimeEnd,
    handleTimeChange,
    handleLabelFormatItem,
    handleLabelFormatHeader,
    handleDoubleClick,
    // handleMoveItem,
  };
}
