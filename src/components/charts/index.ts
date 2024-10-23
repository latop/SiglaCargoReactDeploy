import { BubbleDataPoint, ChartData, Point } from "chart.js";

export * from "./horizontalBars.charts";

export interface ChartDataSet {
  label?: string | number;
  data?: (string | number)[];
}

export type ChartBarData = ChartData<
  "bar",
  (number | [number, number] | Point | BubbleDataPoint | null)[],
  unknown
>;

// export const transformData = ({ config, data }: TransformData) => {
//   const labels = Array.from(new Set(data.map((item) => {
//     return item[config.labelY]
//   })))

//   const groups = Array.from(new Set(data.map((item) => {
//     return item[config.labelX]
//   })))
//   console.log(labels)

//   const datasets: { label: string | number; data: (string | number)[]; }[] = []

//   groups.forEach((group) => {
//     datasets.push({
//       label: group,
//       data: data.filter((item) => item[config.labelX] === group).map((item) => item[config.dataFromField]),
//       backgroundColor: generateColor()
//     })
//   })

//   console.log({ labels, datasets: datasets })

//   return { labels, datasets: datasets }
// }
