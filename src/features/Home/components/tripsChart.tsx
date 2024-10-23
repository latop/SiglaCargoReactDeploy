import StackedBarChart from "@/components/charts/stackedBar.charts";
import { ChartData } from "chart.js";
import React from "react";

interface Params {
  data: ChartData<"bar", (number | [number, number] | null)[], unknown>;
}

const TripsChart = ({ data }: Params) => {
  return (
    <div>
      <StackedBarChart
        labels={[
          "2024-09-15",
          "2024-09-16",
          "2024-09-17",
          "2024-09-18",
          "2024-09-19",
          "2024-09-20",
          "2024-09-21",
          "2024-09-22",
          "2024-09-23",
          "2024-09-24",
        ]}
        data={data}
      />
    </div>
  );
};

export default TripsChart;
