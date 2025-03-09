"use client";

import { useResponsibleSector } from "@/features/ResponsibleSector/useResponsibleSector";
import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { ResponsibleSectorType } from "@/interfaces/parameters";
import { fetchResponsibleSectorsById } from "@/services/parameters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

const schema = z.object({
  code: z.string().min(1),
  description: z.string().min(1),
});

type ResponsibleSectorFormType = z.infer<typeof schema>;

export const useResponsibleSectorDialog = () => {
  const { refreshList } = useResponsibleSector();
  const methods = useForm<ResponsibleSectorFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
      description: "",
    },
  });
  const { addToast } = useToast();
  const [handleResponsibleSector, { error: errorResponsibleSector }] =
    useFetch();

  const [hash, setHash] = useHash();

  const isToAddResponsibleSector = !!(hash as string)?.match(
    /#add-responsible-sector/,
  )?.[0];
  const responsibleSectorId = (hash as string)?.match(
    /#responsible-sector-id-(.+)/,
  )?.[1];

  const {
    data: responsibleSector,
    error,
    isLoading,
  } = useSWR<ResponsibleSectorType>(
    responsibleSectorId
      ? {
          url: `responsible-sector-${responsibleSectorId}`,
          id: responsibleSectorId,
        }
      : null,
    fetchResponsibleSectorsById,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: (data) => {
        if (responsibleSectorId) {
          methods.reset({
            code: data.code,
            description: data.description,
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

  const handleErrors = useCallback(
    (data: ResponsibleSectorFormType) => {
      Object.keys(data).forEach((key) => {
        if (methods.formState.errors[key as keyof ResponsibleSectorFormType]) {
          methods.setError(key as keyof ResponsibleSectorFormType, {
            message: "*Obrigatório",
          });
        }
      });
    },
    [methods.formState.errors],
  );

  useEffect(() => {
    handleErrors(methods.getValues());
  }, [handleErrors, methods.formState.errors]);

  const handleSubmit = async (data: ResponsibleSectorFormType) => {
    if (isToAddResponsibleSector) {
      const body = {
        ...data,
      };
      await handleResponsibleSector("/ResponsibleSector", body, {
        method: "post",
        onSuccess: () => {
          addToast("Setor responsável adicionado com sucesso!");
          refreshList();
          setHash("");
        },
        onError: () => {
          addToast("Erro ao adicionar setor responsável.");
          console.error(errorResponsibleSector);
        },
      });
      return;
    }
    if (responsibleSectorId) {
      const body = {
        ...data,
        id: responsibleSectorId,
      };

      await handleResponsibleSector("/ResponsibleSector", body, {
        method: "put",
        onSuccess: () => {
          addToast("Setor responsável atualizado com sucesso!");
          refreshList();
          setHash("");
        },
        onError: () => {
          addToast("Erro ao atualizado setor responsável.");
          console.error(errorResponsibleSector);
        },
      });
      return;
    }
  };

  return {
    isToAddResponsibleSector,
    responsibleSectorId,
    methods,
    responsibleSector,
    isLoading,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
