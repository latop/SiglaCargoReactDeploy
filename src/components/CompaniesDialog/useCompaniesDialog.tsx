"use client";

import { useCompanies } from "@/features/Companies/useCompanies";
import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { fetchCompanyById } from "@/services/parameters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

export const companySchema = z.object({
  id: z.string().nullable(),
  name: z.string().min(1, {
    message: "Obrigatório",
  }),
  code: z.string().min(1, {
    message: "Obrigatório",
  }),
  address: z.string().min(1, {
    message: "Obrigatório",
  }),
  cityId: z.string().min(1, {
    message: "Obrigatório",
  }),
  stateId: z.string().min(1, {
    message: "Obrigatório",
  }),
  countryId: z.string().min(1, {
    message: "Obrigatório",
  }),
  regionId: z.string().nullable(),
  country: z.object({
    code: z.string().nullable(),
    name: z.string().nullable(),
  }),
  state: z.object({
    code: z.string().nullable(),
    name: z.string().nullable(),
  }),
  city: z.object({
    code: z.string().nullable(),
    name: z.string().nullable(),
  }),
  region: z.object({
    code: z.string().nullable(),
    name: z.string().nullable(),
  }),
  isSupplier: z.boolean().default(false),
});
export type CompanyFormType = z.infer<typeof companySchema>;

export const useCompaniesDialog = () => {
  const { refreshList } = useCompanies();
  const methods = useForm<CompanyFormType>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      code: "",
      address: "",
      cityId: "",
      stateId: "",
      countryId: "",
      regionId: null,
      isSupplier: false,
    },
  });
  const { addToast } = useToast();
  const [handleCompany, { error: errorCompany }] = useFetch();

  const [hash, setHash] = useHash();

  const isToAddCompany = !!(hash as string)?.match(/#add-company/)?.[0];
  const companyId = (hash as string)?.match(/#company-id-(.+)/)?.[1];

  const {
    data: company,
    error,
    isLoading,
  } = useSWR<CompanyFormType>(
    companyId ? { url: `company-${companyId}`, id: companyId } : null,
    fetchCompanyById,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: (data) => {
        if (companyId) {
          methods.reset({
            name: data.name,
            code: data.code,
            address: data.address,
            cityId: data.cityId,
            stateId: data.stateId,
            countryId: data.countryId,
            regionId: data.regionId,
            country: {
              name: data.country?.name,
            },
            state: {
              name: data.state?.name,
            },
            city: {
              name: data.city?.name,
            },
            region: {
              name: data.region?.name,
            },
            isSupplier: data.isSupplier,
          });
          return;
        }
        methods.reset({});
      },
      onError: () => {
        console.error(error);
      },
    },
  );

  const handleSubmit = async (data: CompanyFormType) => {
    if (isToAddCompany) {
      const body = {
        ...data,
      };
      await handleCompany("/Companies", body, {
        method: "post",
        onSuccess: () => {
          addToast("Empresa adicionada com sucesso!");
          refreshList();
          setHash("");
        },
        onError: () => {
          addToast("Erro ao adicionar empresa.", { type: "error" });
          console.error(errorCompany);
        },
      });
      return;
    }
    if (companyId) {
      const body = {
        ...data,
        id: company?.id,
      };

      await handleCompany("/Companies", body, {
        method: "put",
        onSuccess: () => {
          addToast("Empresa atualizada com sucesso!");
          refreshList();
          setHash("");
        },
        onError: () => {
          addToast("Erro ao atualizar empresa.", { type: "error" });
          console.error(errorCompany);
        },
      });
      return;
    }
  };

  useLayoutEffect(() => {
    if (isToAddCompany) {
      methods.reset();
    }
  }, [methods.reset, isToAddCompany]);
  return {
    isToAddCompany,
    companyId,
    methods,
    company,
    isLoading,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
