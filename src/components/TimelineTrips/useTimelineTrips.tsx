import { useMemo } from "react";
import { useGiantt } from "@/hooks/useGiantt";
import { DailyTripSection, DriverSchedule, Trip } from "@/interfaces/schedule";
import { Unit } from "react-calendar-timeline";
import dayjs from "dayjs";
import { match } from "ts-pattern";
import { useDriverSchedule } from "@/templates/DriversSchedule/useDriversSchedule";
import { useToast } from "@/hooks/useToast";
import { useHash } from "@/hooks/useHash";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
import { useDailyTripsUnallocated } from "@/hooks/useDailyTripsUnallocated";
import { useDialog } from "@/hooks/useDialog/useDialog";
import { Box, Typography } from "@mui/material";

export function useTimelineTrips({
  trips,
  drivers,
}: {
  trips: Trip[];
  drivers: DriverSchedule[];
}) {
  const [, setHash] = useHash();
  const { addToast } = useToast();
  const { openDialog } = useDialog();
  const { updatedTrip } = useDriverSchedule();
  const {
    visibleTimeEnd,
    visibleTimeStart,
    setVisibleTimeStart,
    setVisibleTimeEnd,
  } = useGiantt();

  const { addNewTrips } = useJourneysByPeriod();
  const { selectedDailyTrip, removeDailyTrip } = useDailyTripsUnallocated();

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
    drivers?.forEach((driver: DriverSchedule) => {
      if (!groupsMap.has(driver?.driverId)) {
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
        title: trip.id,
        start_time: dayjs(trip.startPlanned, "YYYY-MM-DDTHH:mm:ss"),
        end_time: dayjs(trip.endPlanned, "YYYY-MM-DDTHH:mm:ss"),
      });
    });

    return {
      groups: Array.from(groupsMap.values()),
      items: Array.from(itemsMap.values()),
    };
  }, [trips]);

  const handleMoveItem = (
    itemId: string,
    dragTime: number,
    newGroupOrder: number,
  ) => {
    if (!trips || !drivers) return;
    const newDriver = drivers?.[newGroupOrder];

    const tripIndex = trips?.findIndex((trip) => trip.id === itemId);

    if (tripIndex !== undefined && tripIndex >= 0) {
      const currentTrip = trips[tripIndex];
      const difference = dayjs(currentTrip.endPlanned).diff(
        currentTrip.startPlanned,
      );
      const newEndPlanned = dayjs(dragTime).add(difference, "millisecond");
      const startPlanned = dayjs(dragTime).format("YYYY-MM-DDTHH:mm:ss");
      const endPlanned = newEndPlanned.format("YYYY-MM-DDTHH:mm:ss");

      updatedTrip({
        tripId: itemId,
        newStartPlanned: startPlanned,
        newEndPlanned: endPlanned,
        newDriverId: newDriver.driverId,
      });

      addToast("Viagem movida com sucesso.", { type: "success" });
    }
  };

  const handleConfirmAllocate = (driverId: string) => {
    const currentDriver = drivers?.find(
      (driver) => driver.driverId === driverId,
    );
    if (!currentDriver || !selectedDailyTrip) return;

    const newTrips = selectedDailyTrip.sectionsUnallocated.map(
      (section: DailyTripSection) => {
        const newTrip: Trip = {
          id: section.dailyTripSectionId,
          code: selectedDailyTrip.sto,
          startPlanned: section.startPlanned,
          endPlanned: section.endPlanned,
          driverId: driverId,
          driverName: currentDriver.driverName,
          locationOrigCode: section.locOrig,
          locationDestCode: section.locDest,
        };
        return newTrip;
      },
    );
    addNewTrips(newTrips);

    setTimeout(() => {
      removeDailyTrip(selectedDailyTrip.dailyTripId);
    }, 300);

    addToast("Viagem alocada com sucesso.", { type: "success" });
  };

  const handleCanvasClick = (driverId: string) => {
    const currentDriver = drivers?.find(
      (driver) => driver.driverId === driverId,
    );
    if (!currentDriver || !selectedDailyTrip) return;

    openDialog({
      title: "Alocar motorista",
      body: (
        <Box>
          <Typography>
            Deseja associar o motorista{" "}
            <strong>{currentDriver?.driverName}</strong> a todas as viagens
            desta rota?
          </Typography>
          <Box marginTop="10px">
            <Box display="flex" flexDirection="row" gap="3px">
              <Typography variant="caption" fontWeight="bold">
                Início da jornada:{" "}
              </Typography>
              <Typography variant="caption">
                {dayjs(selectedDailyTrip.startPlanned).format(
                  "DD/MM/YYYY [as] HH:mm",
                )}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" gap="3px">
              <Typography variant="caption" fontWeight="bold">
                Fim da jornada:{" "}
              </Typography>
              <Typography variant="caption">
                {dayjs(selectedDailyTrip.endPlanned).format(
                  "DD/MM/YYYY [as] HH:mm",
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
      onConfirm: () => handleConfirmAllocate(driverId),
    });
  };

  return {
    groups,
    items,
    visibleTimeStart,
    visibleTimeEnd,
    handleTimeChange,
    handleLabelFormatItem,
    handleLabelFormatHeader,
    handleDoubleClick,
    handleMoveItem,
    handleCanvasClick,
  };
}
