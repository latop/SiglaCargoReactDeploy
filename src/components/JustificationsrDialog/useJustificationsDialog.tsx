/* eslint-disable prettier/prettier */
"use client";

import { useResponsibleSector } from "@/features/ResponsibleSector/useResponsibleSector";
import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { ResponsibleSectorType } from "@/interfaces/parameters";
import { fetchJustificationById } from "@/services/parameters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

const schema = z.object({
  code: z
    .string()
    .min(1, {
      message: "Obrigatório",
    })
    .max(10, {
      message: "Máximo 10 caracteres.",
    }),
  description: z.string().min(1, {
    message: "Obrigatório",
  }).max(100, {
    message: "Máximo 100 caracteres.",
  }),
  responsibleSectorId: z.string().optional(),
  responsibleSector: z.record(z.any()).optional(),
  type: z.string().optional(),
});

type JustificationsFormType = z.infer<typeof schema>;

export const useJustificationsDialog = () => {
  const { refreshList } = useResponsibleSector();
  const methods = useForm<JustificationsFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
      description: "",
      responsibleSectorId: "",
      type: "",
    },
  });
  const { addToast } = useToast();
  const [handleJustification, { error: errorResponsibleSector }] =
    useFetch();

  const [hash, setHash] = useHash();

  const isToAddJustification = !!(hash as string)?.match(
    /#add-justifications/,
  )?.[0];
  const justificationId = (hash as string)?.match(
    /#justification-id-(.+)/,
  )?.[1];

  const {
    data: justification,
    error,
    isLoading,
  } = useSWR<ResponsibleSectorType>(
    justificationId
      ? {
        url: `justification-${justificationId}`,
        id: justificationId,
      }
      : null,
    fetchJustificationById,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: (data) => {
        if (justificationId) {
          console.log('Acessei')
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

  console.log(justification);
  const handleSubmit = async (data: JustificationsFormType) => {
    if (isToAddJustification) {
      const body = {
        ...data,
      };
      await handleJustification("/Justification", body, {
        method: "post",
        onSuccess: () => {
          addToast("Justificativa adicionada com sucesso!");
          refreshList();
          setHash("");
        },
        onError: () => {
          addToast("Erro ao adicionar justificativa.", { type: "error" });
          console.error(errorResponsibleSector);
        },
      });
      return;
    }
    if (justificationId) {
      const body = {
        ...data,
        id: justification?.id,
      };

      await handleJustification("/Justification", body, {
        method: "put",
        onSuccess: () => {
          addToast("Justificativa atualizada com sucesso!");
          refreshList();
          setHash("");
        },
        onError: () => {
          addToast("Erro ao atualizar Justificativa.", { type: "error" });
          console.error(errorResponsibleSector);
        },
      });
      return;
    }
  };

  useLayoutEffect(() => {
    if (isToAddJustification) {
      methods.reset();
    }
  }, [methods.reset, isToAddJustification]);

  return {
    isToAddJustification,
    justificationId,
    methods,
    justification,
    isLoading,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
