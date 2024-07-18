import { Box, Dialog, DialogTitle } from "@mui/material";
import { FC } from "react";
import { useReleaseDriverDialog } from "./useReleaseDriverDialog";
import { FormProvider } from "react-hook-form";
import { useDialog } from "@/hooks/useDialog/useDialog";

interface ReleaseDriverDialogProps {
  onClose: () => void;
  open: boolean;
}

export const ReleaseDriverDialog: FC<ReleaseDriverDialogProps> = ({
  onClose,
  open,
}) => {
  const { releaseDriverId, methods } = useReleaseDriverDialog();
  const { openDialog } = useDialog();

  console.log(releaseDriverId);
  const handleClose = () => {
    openDialog({
      title: "Salvar informações?",
      onConfirm: () => {
        onClose();
      },
      onCancel: () => console.log("não fecha"),
    });
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      PaperProps={{ sx: { height: "100%", maxWidth: "1400px" } }}
    >
      <FormProvider {...methods}>
        <form>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <Box display="flex" justifyContent="space-between">
              Motorista para liberar
            </Box>
          </DialogTitle>
        </form>
      </FormProvider>
    </Dialog>
  );
};
