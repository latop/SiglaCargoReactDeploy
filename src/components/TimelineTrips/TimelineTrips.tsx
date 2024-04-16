import React from "react";
import Timeline, {
  ItemContext,
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import Tooltip from "@mui/material/Tooltip";
import { useTimelineTrips } from "./useTimelineTrips";
import { red } from "@mui/material/colors";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";
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
import { Trip } from "@/interfaces/schedule";

export function TimelineTrips() {
  const { trips, circuits } = useJourneysByPeriod();
  const {
    groups,
    items,
    visibleTimeStart,
    handleTimeChange,
    visibleTimeEnd,
    handleDoubleClick,
    handleLabelFormatItem,
    handleMoveItem,
    handleLabelFormatHeader,
    handleCanvasClick,
  } = useTimelineTrips();

  const itemRenderer = ({
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
    let currentTrip = trips.find((trip: Trip) => trip.id === itemContext.title);
    if (!currentTrip) {
      circuits?.forEach((circuit) => {
        const curr = circuit.trips.find(
          (trip) => trip.id === itemContext.title,
        );
        if (curr) {
          currentTrip = curr;
        }
      });
    }

    const isCircuit = circuits?.some(
      (circuit) => circuit.ciruictCode === itemContext.title,
    );
    const itemProps = getItemProps({});

    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected
      ? "RGBA(244, 67, 54, 0.3)"
      : isCircuit
      ? "rgb(171 194 212 / 30%)"
      : currentTrip?.colorRGB || "#4663ab";
    const borderColor = itemContext.resizing ? red[500] : "transparent";

    return (
      <TimelineItem
        {...itemProps}
        className="giantt-item"
        isStop={currentTrip?.tripType === "STOP"}
        isCircuit={isCircuit}
        title=""
        selected={itemContext.selected}
      >
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
        <Tooltip title={currentTrip?.code}>
          <TimelineItemTitle
            isCircuit={!!isCircuit}
            isStop={currentTrip?.tripType === "STOP"}
            style={{
              backgroundColor,
              borderColor,
            }}
          >
            {!currentTrip?.locationDestCode &&
              currentTrip?.tripType !== "STOP" &&
              currentTrip?.code}
          </TimelineItemTitle>
        </Tooltip>

        {!!itemContext.useResizeHandle && <div {...rightResizeProps} />}
      </TimelineItem>
    );
  };

  return (
    <Timeline
      lineHeight={55}
      onItemDoubleClick={handleDoubleClick}
      groups={groups}
      items={items}
      canMove
      canResize={false}
      canChangeGroup
      onItemMove={handleMoveItem}
      onCanvasClick={handleCanvasClick}
      minZoom={60 * 60 * 24}
      stackItems={false}
      maxZoom={604800000}
      onTimeChange={handleTimeChange}
      visibleTimeStart={visibleTimeStart}
      itemRenderer={itemRenderer}
      visibleTimeEnd={visibleTimeEnd}
    >
      <TimelineHeaders style={{ position: "sticky", top: 0, zIndex: 100 }}>
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
  );
}
