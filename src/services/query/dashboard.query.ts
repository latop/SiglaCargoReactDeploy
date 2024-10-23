import api from "../configs/api";

const getDashboard = async () => {
  try {
    const response = await api.get("/dashboard/GetDashboardInfo");
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const useGetDashboardQuery = {
  queryKey: ["dashboard"],
  queryFn: getDashboard,
};
