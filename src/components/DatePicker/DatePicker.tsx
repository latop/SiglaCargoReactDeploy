import React from "react";
import { Typography } from "@mui/material";
import {
  DatePicker as DatePickerBase,
  DatePickerProps as DatePickerBaseProps,
} from "@mui/x-date-pickers";
import {
  DateTimePicker as DateTimePickerBase,
  DateTimePickerProps as DateTimePickerPropsBase,
} from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import { Ref, forwardRef } from "react";
import { Container } from "./DatePicker.styles";
import { red } from "@mui/material/colors";

interface DatePickerProps extends DatePickerBaseProps<Dayjs> {
  error?: string;
  displayIcon?: boolean;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ error, displayIcon = false, ...props }, ref: Ref<HTMLDivElement>) => (
    <Container>
      <DatePickerBase
        {...props}
        ref={ref as Ref<HTMLDivElement>}
        slots={{
          ...props.slots,
          ...(displayIcon && { openPickerIcon: () => null }),
        }}
      />
      {!!error && (
        <Typography fontSize="12px" color={red[700]}>
          {error}
        </Typography>
      )}
    </Container>
  ),
);

interface DateTimePickerProps extends DateTimePickerPropsBase<Dayjs> {
  error?: string;
  displayIcon?: boolean;
}

export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
  ({ error, displayIcon = false, ...props }, ref: Ref<HTMLDivElement>) => (
    <Container>
      <DateTimePickerBase
        {...props}
        ref={ref as Ref<HTMLDivElement>}
        slots={{
          ...props.slots,
          ...(displayIcon && { openPickerIcon: () => null }),
        }}
      />
      {!!error && (
        <Typography fontSize="12px" color={red[700]}>
          {error}
        </Typography>
      )}
    </Container>
  ),
);

DateTimePicker.displayName = "DateTimePicker";
DatePicker.displayName = "DatePicker";
