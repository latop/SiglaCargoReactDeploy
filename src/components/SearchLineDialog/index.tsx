import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { AutocompleteLocation } from "../AutocompleteLocation";
import { Location } from "@/interfaces/trip";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRInfinite from "swr/infinite";
import { Line } from "@/interfaces/lines";
import { fetchLines } from "@/services/trips";
import { LinesTable } from "./components/LinesTable";
import { useCallback, useState } from "react";

interface SearchRouteModalProps {
  open: boolean;
  onClose: () => void;
  seq: number;
}

const schema = z.object({
  locationOrigId: z.string().min(1, "Obrigatório*"),
  locationOrigCode: z.string().min(1, "Obrigatório*"),
  locationDestId: z.string().min(1, "Obrigatório*"),
  locationDestCode: z.string().min(1, "Obrigatório*"),
});

type FormType = z.infer<typeof schema>;

export const SearchLineModal = ({
  onClose: handleClose,
  open,
  seq,
}: SearchRouteModalProps) => {
  const [selectedLine, setSelectLine] = useState<Line | undefined>();

  const handleSelectedLine = useCallback(
    (value: Line | undefined) => {
      setSelectLine((prevState) => {
        if (prevState?.line.id === value?.line.id) {
          prevState = undefined;
          return prevState;
        }

        if (!prevState || prevState?.line.id !== value?.line.id) {
          prevState = value;
          return prevState;
        }

        return undefined;
      });
    },
    [setSelectLine],
  );

  const {
    setValue: setValueDriverJourneyLine,
    formState: { isSubmitting },
  } = useFormContext();

  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      locationDestId: "",
      locationOrigId: "",
      locationDestCode: "",
      locationOrigCode: "",
    },
  });

  const { setValue, getValues: lineValues, reset } = methods;

  const getKey = (pageIndex: number) => {
    const args = lineValues();
    if (!lineValues()) return null;
    return {
      url: `/lines-${Object.values(args).join("")}`,
      args: { ...args, pageSize: 10, pageNumber: pageIndex + 1 },
    };
  };

  const { data } = useSWRInfinite(getKey, fetchLines, {
    revalidateFirstPage: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  const handleChangeLocationOrig = (value?: Location | null) => {
    setValue("locationOrigId", value?.id || "");
    setValue("locationOrigCode", value?.code || "");
  };

  const handleChangeLocationDest = (value?: Location | null) => {
    setValue("locationDestId", value?.id || "");
    setValue("locationDestCode", value?.code || "");
  };

  const onSetLine = () => {
    setValueDriverJourneyLine(
      `tasksDriver.${seq}.lineCode`,
      selectedLine?.line.code,
    );
    handleClose();
    reset({});
  };

  const onClose = () => {
    reset({});
    handleClose();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      PaperProps={{
        sx: {
          height: "650px",
          maxHeight: "650px",
          minHeight: "500px",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: "1rem 1rem" }} id="customized-dialog-title">
        Procurar Rota
      </DialogTitle>
      <DialogContent dividers sx={{ padding: "16px" }}>
        <FormProvider {...methods}>
          <form>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={5}>
                <AutocompleteLocation
                  name="locationOrigCode"
                  label="Origem"
                  keyCode="id"
                  onChange={handleChangeLocationOrig}
                />
              </Grid>
              <Grid item xs={5}>
                <AutocompleteLocation
                  name="locationDestCode"
                  label="Destino"
                  keyCode="id"
                  onChange={handleChangeLocationDest}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#666",
                  fontStyle: "italic",
                  display: "block",
                  mb: 1,
                }}
              >
                Selecione uma rota da lista abaixo para continuar
              </Typography>
            </Box>
          </form>
          <LinesTable
            lines={data?.[0]?.lines}
            onSelect={handleSelectedLine}
            selectedLine={selectedLine}
          />
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          justifyContent="end"
          padding="10px"
          width="100%"
          gap={1}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              alignSelf: "flex-end",
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={onSetLine}>
            {isSubmitting && (
              <CircularProgress
                color="inherit"
                size={20}
                sx={{ margin: "2px 11.45px" }}
              />
            )}
            {!isSubmitting && `Confirmar`}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
