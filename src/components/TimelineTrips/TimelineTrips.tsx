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
import {
  TimelineItem,
  TimelineItemSubtitle,
  TimelineItemDestination,
  TimelineItemOrigin,
  TimelineItemTitle,
} from "./TimelineTrips.styles";
import "dayjs/locale/pt-br";
import "react-calendar-timeline/lib/Timeline.css";
import "./Timeline.css";

interface TimelineTripsProps {
  trips: Trip[];
  drivers: DriverSchedule[];
}

export function TimelineTrips({ trips, drivers }: TimelineTripsProps) {
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
    handleMoveItem,
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
      <TimelineItem {...getItemProps({})} className="giantt-item">
        {!!itemContext.useResizeHandle && <div {...leftResizeProps} />}
        {itemContext.dimensions.width > 50 &&
          currentTrip?.locationDestCode &&
          currentTrip?.locationOrigCode && (
            <TimelineItemSubtitle>
              <TimelineItemOrigin>
                {currentTrip.locationOrigCode}
              </TimelineItemOrigin>
              <TimelineItemDestination>
                {currentTrip.locationDestCode}
              </TimelineItemDestination>
            </TimelineItemSubtitle>
          )}
        <TimelineItemTitle
          style={{
            height: `calc(${itemContext.dimensions.height} - 8px)`,
            backgroundColor,
            borderColor,
          }}
        >
          {currentTrip?.code}
        </TimelineItemTitle>

        {!!itemContext.useResizeHandle && <div {...rightResizeProps} />}
      </TimelineItem>
    );
  };

  return (
    <>
      <Timeline
        lineHeight={55}
        onItemDoubleClick={handleDoubleClick}
        groups={groups}
        items={items}
        canMove
        canResize={false}
        canChangeGroup
        onItemMove={handleMoveItem}
        minZoom={60 * 60 * 24}
        maxZoom={604800000}
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