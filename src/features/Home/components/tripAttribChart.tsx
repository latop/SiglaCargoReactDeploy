import { ChartBarData } from "@/components/charts";
import HorizontalBars from "@/components/charts/horizontalBars.charts";

interface Params {
  data: ChartBarData;
}

const TripAttribChart = ({ data }: Params) => {
  return (
    <div>
      <HorizontalBars
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

export default TripAttribChart;
