import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { FC } from "react";
import { useReleaseDriverDialog } from "./useReleaseDriverDialog";
import { FormProvider } from "react-hook-form";
import { useDialog } from "@/hooks/useDialog/useDialog";
import CloseIcon from "@mui/icons-material/Close";
import { ReleaseDriverForm } from "./ReleaseDriverForm";

interface ReleaseDriverDialogProps {
  onClose: () => void;
  open: boolean;
}

export const ReleaseDriverDialog: FC<ReleaseDriverDialogProps> = ({
  onClose,
  open,
}) => {
  const { methods, loading } = useReleaseDriverDialog();
  const { openDialog } = useDialog();

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
            <IconButton
              aria-label="close"
              onClick={handleClose}
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
              {loading && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  padding="10px"
                  height="100%"
                >
                  <CircularProgress />
                </Box>
              )}

              {!loading && <ReleaseDriverForm />}
            </DialogContent>
          </DialogTitle>
        </form>
      </FormProvider>
    </Dialog>
  );
};
