import React from "react";
import { Waypoint } from "react-waypoint";
import Timeline, {
  ItemContext,
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import { DailyTrip, DailyTripSection } from "@/interfaces/schedule";
import { useTimelineTripsUnallocated } from "./useTimelineTripsUnallocated";
import { Box, Card, CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";
import {
  TimelineItem,
  TimelineItemSubtitle,
  TimelineItemDestination,
  TimelineItemOrigin,
  TimelineItemTitle,
} from "./TimelineTripsUnallocated.styles";
import "dayjs/locale/pt-br";
import "react-calendar-timeline/lib/Timeline.css";
import "./Timeline.css";

interface TimelineTripsUnallocatedProps {
  tripsUnallocated: DailyTrip[];
  isReachingEnd: boolean;
  onPaginate: () => void;
  isLoadingMore: boolean;
}

export function TimelineTripsUnallocated({
  tripsUnallocated,
  onPaginate,
  isReachingEnd,
  isLoadingMore,
}: TimelineTripsUnallocatedProps) {
  const {
    groups,
    items,
    visibleTimeStart,
    handleTimeChange,
    visibleTimeEnd,
    // handleDoubleClick,
    handleLabelFormatItem,
    // handleMoveItem,
    handleLabelFormatHeader,
  } = useTimelineTripsUnallocated(tripsUnallocated);

  function findSectionById(tripsData: DailyTrip[], sectionId: string) {
    for (const trip of tripsData) {
      const section = trip.sectionsUnallocated.find(
        (section: DailyTripSection) => section.dailyTripSectionId === sectionId,
      );
      if (section) {
        return section;
      }
    }
    return null;
  }

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
    const currentTrip = findSectionById(tripsUnallocated, item.id);

    return (
      <TimelineItem {...getItemProps({})} className="giantt-item">
        {!!itemContext.useResizeHandle && <div {...leftResizeProps} />}
        {itemContext.dimensions.width > 40 &&
          currentTrip?.locDest &&
          currentTrip?.locOrig && (
            <TimelineItemSubtitle>
              <TimelineItemOrigin>{currentTrip.locOrig}</TimelineItemOrigin>
              <TimelineItemDestination>
                {currentTrip.locDest}
              </TimelineItemDestination>
            </TimelineItemSubtitle>
          )}
        <TimelineItemTitle
          style={{
            height: `calc(${itemContext.dimensions.height} - 15px)`,
            backgroundColor,
            borderColor,
          }}
        />

        {!!itemContext.useResizeHandle && <div {...rightResizeProps} />}
      </TimelineItem>
    );
  };

  return (
    <Card
      sx={{ height: "calc(25% - 25px)", overflow: "auto", marginTop: "15px" }}
    >
      <Timeline
        lineHeight={40}
        // onItemDoubleClick={handleDoubleClick}
        groups={groups}
        items={items}
        canMove={false}
        canResize={false}
        canChangeGroup={false}
        // onItemMove={handleMoveItem}
        className="timeline-trips-unallocated"
        minZoom={60 * 60 * 24}
        stackItems
        maxZoom={604800000}
        onTimeChange={handleTimeChange}
        visibleTimeStart={visibleTimeStart}
        itemRenderer={itemRenderer}
        visibleTimeEnd={visibleTimeEnd}
      >
        <TimelineHeaders
          className="timeline-trips-unallocated-header"
          style={{ position: "sticky", top: 0 }}
        >
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
      {!isReachingEnd && <Waypoint onEnter={onPaginate} bottomOffset={-250} />}
      {isLoadingMore && (
        <Box display="flex" justifyContent="center" mt={2} marginBottom={2}>
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
}
