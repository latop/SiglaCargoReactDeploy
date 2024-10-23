import { ChartBarData } from "@/components/charts";
import { generateRandomColor } from "@/utils";
import { BubbleDataPoint, ChartDataset, Point } from "chart.js";
import dayjs from "dayjs";
import api from "../configs/api";
import Error from "next/error";

interface DashboardDemands {
  demandDate: string;
  locationCode: string;
  qtyDemands: number;
}

interface DashboardTrips {
  tripDate: string;
  tripTypeCode: string;
  qtyTrips: number;
}

interface DashboardTripsAttrib {
  tripDate: string;
  tripTypeCode: string;
  qtyTrips: number;
  qtyTripsAttrib: number;
}

interface DashboardTripsCompleted {
  tripDate: string;
  tripTypeCode: string;
  qtyTrips: number;
  qtyStarted: number;
  qtyCompleted: number;
}
interface Dashboard {
  dashboardDemands: DashboardDemands[];
  dashboardTrips: DashboardTrips[];
  dashboardTripsAttrib: DashboardTripsAttrib[];
  dashboardTripsCompleted: DashboardTripsCompleted[];
}

interface DashboardResponse {
  dashboardDemands?: DashboardDemands[];
  dashboardTrips?: DashboardTrips[];
  dashboardTripsAttrib?: ChartBarData;
  dashboardTripsCompleted?: ChartBarData;
}

const dashboardTripsCompletedTransform = async (
  originalData: DashboardTripsCompleted[],
): Promise<ChartBarData> => {
  return new Promise((resolve) => {
    const labels = Array.from(
      new Set(
        originalData.map((item) => dayjs(item.tripDate).format("DD/MM/YYYY")),
      ),
    );

    const datasets: ChartDataset<
      "bar",
      (number | [number, number] | Point | BubbleDataPoint | null)[]
    >[] = [];

    const resume = originalData.reduce(
      (total, item) => {
        total.trips.push(item.qtyTrips);
        total.started.push(item.qtyStarted);
        total.completed.push(item.qtyCompleted);
        return total;
      },
      {
        trips: [] as number[],
        started: [] as number[],
        completed: [] as number[],
      },
    );

    datasets.push({
      label: "Viagens",
      data: [...resume.trips],
      backgroundColor: generateRandomColor(),
    });

    datasets.push({
      label: "Iniciadas",
      data: [...resume.started],
      backgroundColor: generateRandomColor(),
    });

    datasets.push({
      label: "Completas",
      data: [...resume.completed],
      backgroundColor: generateRandomColor(),
    });
    console.log("teste", { labels, datasets });
    resolve({ labels, datasets });
  });
};

const dashboardTripsAttribTransform = async (
  originalData: DashboardTripsAttrib[],
): Promise<ChartBarData> => {
  return new Promise((resolve) => {
    const labels = Array.from(
      new Set(
        originalData.map((item) => dayjs(item.tripDate).format("DD/MM/YYYY")),
      ),
    );

    const datasets: ChartDataset<
      "bar",
      (number | [number, number] | Point | BubbleDataPoint | null)[]
    >[] = [];

    const resume = originalData.reduce(
      (total, item) => {
        total.trips.push(item.qtyTrips);
        total.attrib.push(item.qtyTripsAttrib);
        return total;
      },
      { trips: [] as number[], attrib: [] as number[] },
    );

    datasets.push({
      label: "Viagens",
      data: [...resume.trips],
      backgroundColor: generateRandomColor(),
    });

    datasets.push({
      label: "Atribuidas",
      data: [...resume.attrib],
      backgroundColor: generateRandomColor(),
    });

    resolve({ labels, datasets });
  });
};

const getDashboard = async (): Promise<DashboardResponse> => {
  try {
    const response = await api.get("/dashboard/GetDashboardInfo");
    const data: Dashboard = response.data;
    console.log(data);
    const dashboardDemands = data.dashboardDemands.map((item) => {
      return {
        ...item,
        demandDate: dayjs(item.demandDate).format("DD/MM/YYYY"),
      };
    });

    const dashboardTrips = data.dashboardTrips.map((item) => {
      return {
        ...item,
        tripDate: dayjs(item.tripDate).format("DD/MM/YYYY"),
      };
    });

    const dashboardTripsAttrib = await dashboardTripsAttribTransform(
      data.dashboardTripsAttrib,
    );

    const dashboardTripsCompleted = await dashboardTripsCompletedTransform(
      data.dashboardTripsCompleted,
    );

    return {
      dashboardDemands,
      dashboardTrips,
      dashboardTripsAttrib,
      dashboardTripsCompleted,
    };
  } catch (error) {
    const err = error as Error;
    console.error(err);
    return {};
  }
};

export const useGetDashboardQuery = {
  queryKey: ["dashboard"],
  queryFn: getDashboard,
};
