import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

type UsePostOptions<T> = {
  onSuccess?: (response: AxiosResponse<T>) => void;
  onError?: (error: AxiosError) => void;
};

export function usePost<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const doPost = async (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options?: UsePostOptions<T>,
  ) => {
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await axios.post<T>(url, body);

      setData(response.data);

      if (options?.onSuccess) {
        options.onSuccess(response);
      }
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);

      if (options?.onError) {
        options.onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return [doPost, { data, loading, error }] as const;
}
