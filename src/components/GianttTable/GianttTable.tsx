import React, { useState } from "react";
import Timeline, {
  ItemContext,
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  Unit,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { DriverSchedule, Trip } from "@/interfaces/schedule";
import { useGianttTable } from "./useGianttTable";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./GianttTable.css";
import "dayjs/locale/pt-br";
import { TripDetailsDialog } from "@/components/TripDetailsDialog";
import { red } from "@mui/material/colors";

export function GianttTable({
  trips,
  drivers,
}: {
  trips: Trip[];
  drivers: DriverSchedule[];
}) {
  const [tripDetailId, setTripDetailId] = useState<string | null>(null);
  const {
    groups,
    items,
    visibleTimeStart,
    zoom,
    handleTimeChange,
    handleChangeZoom,
    visibleTimeEnd,
  } = useGianttTable({
    trips,
    drivers,
  });

  const handleTripDetailClose = () => {
    setTripDetailId(null);
  };

  const itemRenderer = ({
    item,
    itemContext,
    getItemProps,
    getResizeProps,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any;
    itemContext: ItemContext;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getItemProps: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getResizeProps: any;
  }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected ? red[500] : "#4663ab";
    const borderColor = itemContext.resizing ? red[500] : item.color;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: "#ffffff",
            borderColor,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 4,
            borderLeftWidth: 1,
            borderRightWidth: 1,
          },
          onMouseDown: () => {
            console.log("on item click", item);
          },
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}
        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

  const handleLabelFormat = (
    [startTime]: [Date],
    unit: Unit,
    labelWidth: number,
  ) => {
    if (unit === "hour") {
      const formatPtBR = new Intl.DateTimeFormat("pt-BR", { hour: "numeric" });
      return `${formatPtBR.format(startTime)}`;
    }

    if (unit === "day" && labelWidth < 100) {
      const formatPtBR = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
      });
      return `${formatPtBR.format(startTime)}`;
    }

    if (unit === "month") {
      const formatPtBR = new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "short",
      });
      return `${formatPtBR.format(startTime)}`;
    }

    const formatPtBR = new Intl.DateTimeFormat("pt-BR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return `${formatPtBR.format(startTime)}`;
  };

  const handleLabelFormatHeader = ([startTime]: Date[], unit: Unit) => {
    if (unit === "year") {
      const formatPtBR = new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
      });
      return `${formatPtBR.format(startTime)}`;
    }

    if (unit === "day") {
      const formatPtBR = new Intl.DateTimeFormat("pt-BR", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return `${formatPtBR.format(startTime)}`;
    }

    const formatPtBR = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
    });
    return `${formatPtBR.format(startTime)}`;
  };

  return (
    <Box>
      <ToggleButtonGroup
        color="primary"
        value={zoom}
        sx={{ padding: "0 0 16px" }}
        exclusive
        onChange={handleChangeZoom}
        aria-label="Platform"
      >
        <ToggleButton value="1">1 dia</ToggleButton>
        <ToggleButton value="3">3 dias</ToggleButton>
        <ToggleButton value="7">7 dias</ToggleButton>
      </ToggleButtonGroup>

      <Timeline
        lineHeight={50}
        onItemDoubleClick={(itemId: string) => {
          setTripDetailId(itemId);
        }}
        groups={groups}
        items={items}
        canMove={false}
        maxZoom={604800000}
        canResize={false}
        onTimeChange={handleTimeChange}
        visibleTimeStart={visibleTimeStart}
        itemRenderer={itemRenderer}
        visibleTimeEnd={visibleTimeEnd}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()} />;
            }}
          </SidebarHeader>
          <DateHeader
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore next line
            labelFormat={handleLabelFormatHeader}
            unit="primaryHeader"
          />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore next line */}
          <DateHeader labelFormat={handleLabelFormat} />
        </TimelineHeaders>
      </Timeline>
      {tripDetailId && (
        <TripDetailsDialog
          open={!!tripDetailId}
          id={tripDetailId}
          onClose={handleTripDetailClose}
        />
      )}
    </Box>
  );
}
