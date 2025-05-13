import { GridDeleteForeverIcon } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface ActionsColumnProps {
  onDelete: () => void;
  onEdit?: () => void;
  isLoadingDelete?: boolean;
}

export const ActionsColumn = ({
  onDelete,
  onEdit,
  isLoadingDelete,
}: ActionsColumnProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {onEdit && (
        <EditIcon
          sx={{
            cursor: "pointer",
            color: "#1976d2",
          }}
          onClick={onEdit}
        />
      )}
      {onDelete && (
        <GridDeleteForeverIcon
          sx={{
            cursor: "pointer",
            color: "#e53935",
          }}
          onClick={onDelete}
          style={{
            opacity: isLoadingDelete ? 0.5 : 1,
            pointerEvents: isLoadingDelete ? "none" : "auto",
          }}
        />
      )}
    </Box>
  );
};
