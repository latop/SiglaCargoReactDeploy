import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

type UsePostOptions<ResponseData, ErrorType> = {
  onSuccess?: (data: ResponseData) => void;
  onError?: (error: ErrorType) => void;
};

export function usePost<RequestData, ResponseData, ErrorType = string>() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const doPost = async (
    url: string,
    body: RequestData,
    options?: UsePostOptions<ResponseData, ErrorType>,
  ) => {
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await axios.post<ResponseData>(url, body);

      setData(response.data);

      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }
    } catch (err) {
      let errorMessage: ErrorType;
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.message as ErrorType;
      } else {
        errorMessage = "An unknown error occurred" as ErrorType;
      }

      setError(errorMessage);
      if (options?.onError) {
        options.onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return [doPost, { data, loading, error }] as const;
}
