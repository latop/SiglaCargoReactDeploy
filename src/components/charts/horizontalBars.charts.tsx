import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { ChartBarData } from ".";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Params {
  labels: string[];
  data: ChartBarData;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Quantidade de Viagens Realizadas",
    },
  },
};

const HorizontalBars = ({ data }: Params) => {
  return <Bar options={options} data={data} />;
};

export default HorizontalBars;
