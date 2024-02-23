import React from "react";
import Timeline, {
  ItemContext,
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import { DriverSchedule, Trip } from "@/interfaces/schedule";
import { useTimelineTrips } from "./useTimelineTrips";
import { TripDetailsDialog } from "@/components/TripDetailsDialog";
import { red } from "@mui/material/colors";
import "dayjs/locale/pt-br";
import "react-calendar-timeline/lib/Timeline.css";
import "./Timeline.css";

export function TimelineTrips({
  trips,
  drivers,
}: {
  trips: Trip[];
  drivers: DriverSchedule[];
}) {
  const {
    groups,
    items,
    visibleTimeStart,
    handleTimeChange,
    visibleTimeEnd,
    handleDoubleClick,
    tripDetailId,
    showTripDetails,
    handleCloseTripDetails,
    handleLabelFormatItem,
    handleLabelFormatHeader,
  } = useTimelineTrips({
    trips,
    drivers,
  });

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
    const currentTrip = trips.find((trip) => trip.id === itemContext.title);
    return (
      <div {...getItemProps({})} className="giantt-item">
        {!!itemContext.useResizeHandle && <div {...leftResizeProps} />}
        {itemContext.dimensions.width > 50 &&
          currentTrip?.locationDestCode &&
          currentTrip?.locationOrigCode && (
            <div className="giantt-item-subtitle">
              <span>{currentTrip?.locationDestCode}</span>
              <span>{currentTrip?.locationOrigCode}</span>
            </div>
          )}
        <div
          style={{
            height: `calc(${itemContext.dimensions.height} - 8px)`,
            backgroundColor,
            borderColor,
          }}
          className="giantt-item-title"
        >
          {currentTrip?.code}
        </div>

        {!!itemContext.useResizeHandle && <div {...rightResizeProps} />}
      </div>
    );
  };

  return (
    <>
      <Timeline
        lineHeight={55}
        onItemDoubleClick={handleDoubleClick}
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
          <DateHeader labelFormat={handleLabelFormatItem} />
        </TimelineHeaders>
      </Timeline>
      {tripDetailId && (
        <TripDetailsDialog
          open={showTripDetails}
          id={tripDetailId}
          onClose={handleCloseTripDetails}
        />
      )}
    </>
  );
}
