import useSWR from "swr";
import { fetchImportTrips } from "@/services/import-trips";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  Locationcode: z.string(),
  File: z.custom<FileList>((value) => value instanceof FileList, {
    message: "Must be a file",
  }),
});

type ImportTripsForm = z.infer<typeof schema>;

export const useImportTrips = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formMethods = useForm<ImportTripsForm>({
    resolver: zodResolver(schema),
  });

  const searchParams = useSearchParams();
  const params = {
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate"),
  };

  const hasParamsToSearch = Boolean(Object.entries(params).length);

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    {
      url: "/import-trips",
      args: params,
    },
    fetchImportTrips,
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const onSubmit = (data: ImportTripsForm) => {
    console.log(data.File[0]);
  };

  const currentFile = selectedFile?.name;

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
    handleFileChange,
    formMethods,
    onSubmit,
    selectedFile,
    currentFile,
    hasParamsToSearch,
    handleClearFile,
  };
};
