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
import { Box, CircularProgress, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
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
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const {
    groups,
    items,
    visibleTimeStart,
    handleTimeChange,
    selectedDailyTrip,
    visibleTimeEnd,
    handleLabelFormatItem,
    handleLabelFormatHeader,
    handleCanvasClick,
    handleGroupItemClick,
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
    const currentTrip = findSectionById(tripsUnallocated, item.id);
    const selected =
      currentTrip?.dailyTripId === selectedDailyTrip?.dailyTripId ||
      itemContext.selected;
    const backgroundColor = selected ? red[500] : "#4663ab";
    const borderColor = itemContext.resizing ? red[500] : item.color;

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

  const groupRenderer = ({
    group,
  }: {
    group: { id: string; title: string };
  }) => {
    return (
      <div className="custom-group">
        <Box display="flex">
          <span className="title">{group.title}</span>
          <IconButton onClick={() => handleGroupItemClick(group.id)}>
            <FilterListIcon
              fontSize="small"
              color={
                searchParams.get("demand") === group.title
                  ? "primary"
                  : "disabled"
              }
            />
          </IconButton>
        </Box>
      </div>
    );
  };

  return (
    <>
      <Timeline
        lineHeight={40}
        groups={groups}
        items={items}
        canMove={false}
        canResize={false}
        canChangeGroup={false}
        // onItemMove={handleMoveItem}
        className="timeline-trips-unallocated"
        groupRenderer={groupRenderer}
        minZoom={60 * 60 * 24}
        stackItems
        onCanvasClick={handleCanvasClick}
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
    </>
  );
}
