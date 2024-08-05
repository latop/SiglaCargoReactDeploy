/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fetchReportsDownload } from "@/services/reports";
import { FieldValues, useForm } from "react-hook-form";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/useToast";
import dayjs from "dayjs";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const dateOrDayjsSchema = z.custom(
  (val) => val instanceof Date || dayjs.isDayjs(val),
  {
    message: "Data é obrigatório",
  },
);

const reportSchemas = {
  R01: z.object({
    reportCode: z.string(),
    startDate: dateOrDayjsSchema,
    endDate: dateOrDayjsSchema,
    locationCode: z.string({ required_error: "Localização é obrigatória" }),
  }),
  R02: z.object({
    reportCode: z.string(),
    refDate: dateOrDayjsSchema,
    locationCode: z.string().optional(),
    fleetCode: z.string().optional(),
  }),
  R03: z.object({
    reportCode: z.string(),
    refDate: dateOrDayjsSchema,
    fleetCode: z.string().optional(),
    licensePlate: z.string().optional(),
  }),
  R04: z.object({
    reportCode: z.string(),
    refDate: dateOrDayjsSchema,
    locationCode: z.string({ required_error: "Localização é obrigatória" }),
  }),
};

export type ReportSchemas = typeof reportSchemas;

type R01Schema = z.infer<typeof reportSchemas.R01>;
type R02Schema = z.infer<typeof reportSchemas.R02>;
type R03Schema = z.infer<typeof reportSchemas.R03>;
type R04Schema = z.infer<typeof reportSchemas.R04>;

export type ReportFormSchema = R01Schema | R02Schema | R03Schema | R04Schema;

export const useDynamicForm = (reportCode: keyof ReportSchemas) => {
  const { addToast } = useToast();
  const [isDownloadAvailable, setDownloadAvailable] =
    React.useState<boolean>(false);
  const [blobFile, setBlobFile] = React.useState<Blob>();
  const [fileName, setFileName] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const filename = `Report_${reportCode}_${dayjs().format(
    "YYYYMMDDHHmm",
  )}.xlsx`;

  const schema = reportSchemas[reportCode];
  const methods = useForm<ReportFormSchema>({
    resolver: zodResolver(schema),
  });

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
    setIsLoading(true);

    try {
      const { blob } = await fetchReportsDownload(body);
      setDownloadAvailable(true);
      setBlobFile(blob);

      setFileName(filename);
      if (blobFile) return;
      addToast("Relatório pronto para download", { type: "success" });
    } catch (e) {
      addToast("Error ao preparar relatório", { type: "error" });
      setDownloadAvailable(false);
    } finally {
      setIsLoading(false);
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
    methods,
    onSubmit,
    isFileAvailable,
    handleDownload,
    isLoading,
  };
};
