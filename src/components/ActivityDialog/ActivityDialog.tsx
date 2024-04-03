import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { usePost } from "@/hooks/usePost";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { ActivityRequest } from "@/interfaces/schedule";
import { ActivityFooter } from "./components/ActivityFooter";
import { ActivityHeader } from "./components/ActivityHeader";
import { ActivityForm } from "./components/ActivityForm";
import { useToast } from "@/hooks/useToast";
import { useJourneysByPeriod } from "@/hooks/useJourneysByPeriod";

interface ActivityDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ActivityDialog({ open, onClose }: ActivityDialogProps) {
  const { addToast } = useToast();
  const [postActivity] = usePost();
  const { refetch: refetchJourneys } = useJourneysByPeriod();

  const onSubmit = async (data: FieldValues) => {
    const body: ActivityRequest = {
      journeyDate: data.journeyDate,
      driverId: data.driverId,
      activityId: data.activityId,
      startActivity: data.startActivity,
      endActivity: data.endActivity,
      qtyOccur: 1,
      operation: "INSERT",
    };

    await postActivity("/Schedule/UpdateActivity", body, {
      onSuccess: () => {
        addToast("Atividade salva com sucesso");
        refetchJourneys();
        onClose();
      },
      onError: () => {
        addToast("Erro ao salvar atividade", { type: "error" });
      },
    });
  };

  const methods = useForm({
    defaultValues: {
      journeyDate: new Date(),
      startActivity: new Date(),
      endActivity: new Date(),
      activityCode: "",
      activityId: "",
      nickName: "",
    },
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      PaperProps={{ sx: { maxWidth: "950px" } }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              <ActivityHeader />
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers sx={{ padding: "16px" }}>
              <ActivityForm />
            </DialogContent>
            <ActivityFooter />
          </>
        </form>
      </FormProvider>
    </Dialog>
  );
}
