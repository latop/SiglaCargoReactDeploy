import React from "react";
import DialogActions from "@mui/material/DialogActions";
import { Box, CircularProgress, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useDialog } from "@/hooks/useDialog/useDialog";
import { useDriverDialog } from "../../useDriverDialog";

export function DriverFormFooter() {
  const {
    getValues,

    formState: { isSubmitting },
  } = useFormContext();
  const { handleSubmit } = useDriverDialog();

  const { openDialog } = useDialog();

  return (
    <DialogActions>
      <Box display="flex" justifyContent="flex-end" padding="10px" width="100%">
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            openDialog({
              title: "Atualizar a rota",
              message: "Deseja realmente atualizar essa rota?",
              onConfirm: async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                alert("Rota atualizada com sucesso");
                // handleSubmit(getValues());
                handleSubmit(getValues());
              },
            });
          }}
        >
          {isSubmitting && (
            <CircularProgress
              color="inherit"
              size={20}
              sx={{ margin: "2px 11.45px" }}
            />
          )}
          {!isSubmitting && `Salvar`}
        </Button>
      </Box>
    </DialogActions>
  );
}
