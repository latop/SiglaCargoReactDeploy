/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReportsResponse } from "@/interfaces/reports";
import { fetchReports, fetchReportsDownload } from "@/services/reports";
import { FieldValues, useForm } from "react-hook-form";
import useSWR, { SWRConfiguration } from "swr";

import axios from "axios";
import { useToast } from "../useToast";
import React from "react";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export const useReports = (options?: SWRConfiguration) => {
  const { addToast } = useToast();
  const [isDownloadAvailable, setDownloadAvailable] =
    React.useState<boolean>(false);
  const [blobFile, setBlobFile] = React.useState<Blob>();
  const [fileName, setFileName] = React.useState<string>();
  const { data, error, isLoading, mutate } = useSWR<ReportsResponse[]>(
    "/reports",
    fetchReports,
    { ...options },
  );

  const methods = useForm();
  const onSubmit = async (data: FieldValues) => {
    const parameter = Object.entries(data)
      .map(([key, value]) => {
        if (key.includes("reportCode")) return;
        return value;
      })
      .filter((value) => value != undefined || value != null || value == "");
    const body = {
      reportCode: data.reportCode,
      parameter,
      fileType: "XLS",
    };
    await getReport(body);
  };

  const getReport = async (body: any) => {
    try {
      const { blob, filename } = await fetchReportsDownload(body);
      addToast("Relatório salvo com sucesso", { type: "success" });
      setDownloadAvailable(true);
      setBlobFile(blob);
      setFileName(filename);
    } catch (e) {
      addToast("Error ao salvar relatório", { type: "error" });
      setDownloadAvailable(false);
    }
  };

  const handleDownload = (index: string) => {
    const url = window.URL.createObjectURL(blobFile as Blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName as string);
    const downloadReport = document.getElementById(`downloadReport-${index}`);
    downloadReport?.appendChild(link);
    link.click();
    downloadReport?.removeChild(link);
  };

  const isFileAvailable = !isLoading && isDownloadAvailable;

  return {
    data,
    error,
    isLoading,
    mutate,
    methods,
    onSubmit,
    isFileAvailable,
    handleDownload,
  };
};
