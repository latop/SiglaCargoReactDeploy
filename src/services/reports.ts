import { ReportsResponse } from "@/interfaces/reports";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchReports(): Promise<ReportsResponse[]> {
  console.log("fiz a chamada");
  try {
    const response = await axios.get("/api/Report/GetReports");
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
