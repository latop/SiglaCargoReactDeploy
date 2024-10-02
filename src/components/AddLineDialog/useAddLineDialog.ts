import { useFetch } from "@/hooks/useFetch";
import { useHash } from "@/hooks/useHash";
import { useLines } from "@/hooks/useLines";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const lineSchema = z.object({
  id: z.string(),
  code: z.string().min(1, "Obrigatório*"),
  description: z.string().min(1, "Obrigatório*"),
  startDate: z.date(),
  endDate: z.date(),
  freqMon: z.number().optional(),
  freqTue: z.number().optional(),
  freqWed: z.number().optional(),
  freqThu: z.number().optional(),
  freqFri: z.number().optional(),
  freqSat: z.number().optional(),
  freqSun: z.number().optional(),
  overtimeAllowed: z
    .number({ invalid_type_error: "Número*" })
    .optional()
    .default(0),
  locationOrigId: z.string().optional(),
  locationDestId: z.string().optional(),
  cost: z.number({ invalid_type_error: "Número*" }).default(0),
  fleetGroupId: z.string().optional(),
  fleetGroup: z.string().optional(),
  tripTypeId: z.string().optional(),
  tripType: z.string().optional(),
});

const lineSectionsSchema = z
  .array(
    z.object({
      lineSections: z.string(),
    }),
  )
  .optional();

const rootSchema = z.object({
  line: lineSchema,
  lineSections: lineSectionsSchema,
});

export function useAddLineDialog() {
  const { refetchLines } = useLines();
  const methods = useForm({
    defaultValues: {
      line: {
        id: "00000000-0000-0000-0000-000000000000",
        code: "",
        description: "",
        startDate: dayjs().format("YYYY-MM-DD"),
        endDate: dayjs().add(7, "day").format("YYYY-MM-DD"),
        freqMon: 0,
        freqTue: 0,
        freqWed: 0,
        freqThu: 0,
        freqFri: 0,
        freqSat: 0,
        freqSun: 0,
        overtimeAllowed: 0,
        locationOrigId: "",
        locationDestId: "",
        cost: 0,
        fleetGroupId: "",
        fleetGroup: "",
        tripTypeId: "",
        tripType: "",
      },
      lineSections: [],
    },
    resolver: zodResolver(rootSchema),
  });
  const { addToast } = useToast();
  const [lineCreate, { loading }] = useFetch();
  const [, setHash] = useHash();
  const handleSubmit = async (data: FieldValues) => {
    const body = {
      line: {
        ...data.line,
        freqFri: data.line.freqFri ? 1 : 0,
        freqMon: data.line.freqMon ? 1 : 0,
        freqSat: data.line.freqSat ? 1 : 0,
        freqSun: data.line.freqSun ? 1 : 0,
        freqThu: data.line.freqThu ? 1 : 0,
        freqTue: data.line.freqTue ? 1 : 0,
        freqWed: data.line.freqWed ? 1 : 0,
        description: data.line.description,
        code: data.line.code,
        tripType: data.line.tripType,
        tripTypeId: data.line.tripType.id,
        locationOrigId: data.line.locationOrig.id,
        locationDestId: data.line.locationDest.id,
        fleetGroupId: data.line.fleetGroup.id,
      },
      lineSections: data.lineSections,
    };
    return await lineCreate("/updateline", body, {
      onSuccess: () => {
        addToast("Rota criada com sucesso!", { type: "success" });
        refetchLines();
        setHash("");
        methods.reset({});
      },
      onError: (error) => addToast(error.message, { type: "error" }),
    });
  };

  return { methods, handleSubmit, loading };
}
