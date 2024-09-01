import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDialog } from "@/hooks/useDialog/useDialog";
import { NewTruckAssingment } from "../NewTruckAssignment/NewTruckAssignment";
import { useNewTruckAssigment } from "../NewTruckAssignment/useNewTruckAssignment";

export const NewTruckAssignmentButton = () => {
  const { openDialog, closeDialog } = useDialog();
  const { handleSubmit } = useNewTruckAssigment();
  const handleOpenNewTruckAssignmentDialog = () =>
    openDialog({
      title: "Atribuição de novo caminhão",
      body: <NewTruckAssingment />,
      onConfirm: handleSubmit,
      onCancel: () => closeDialog(),
    });

  return (
    <Button variant="outlined" onClick={handleOpenNewTruckAssignmentDialog}>
      Adicionar atribuição
      <AddIcon fontSize="small" />
    </Button>
  );
};
