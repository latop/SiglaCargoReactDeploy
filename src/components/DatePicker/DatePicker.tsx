import React from "react";
import { Typography } from "@mui/material";
import {
  DatePicker as DatePickerBase,
  DatePickerProps as DatePickerBaseProps,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Ref, forwardRef } from "react";
import { Container } from "./DatePicker.styles";

interface DatePickerProps extends DatePickerBaseProps<Dayjs> {
  error?: string;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ error, ...props }, ref: Ref<HTMLDivElement>) => (
    <Container>
      <DatePickerBase {...props} ref={ref as Ref<HTMLDivElement>} />
      {!!error && (
        <Typography fontSize="12px" color="red">
          {error}
        </Typography>
      )}
    </Container>
  ),
);

DatePicker.displayName = "DatePicker";
