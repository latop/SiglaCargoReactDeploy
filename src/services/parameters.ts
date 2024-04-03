import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAcitivities() {
  try {
    const response = await axios.get("/Activity");
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
