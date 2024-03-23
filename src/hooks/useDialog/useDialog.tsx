import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  FC,
} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface DialogContextType {
  openDialog: (config: DialogConfig) => void;
  closeDialog: () => void;
}

interface DialogConfig {
  title?: string;
  body: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface DialogProviderProps {
  children: ReactNode;
}

// Cria o contexto com um valor padrão que é imediatamente substituído pelo valor real no provider.
// Isso evita a necessidade de checagem nula toda vez que o contexto é consumido.
const DialogContext = createContext<DialogContextType>({} as DialogContextType);

export const useDialog = () => useContext(DialogContext);

export const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState<string>("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});
  const [onCancel, setOnCancel] = useState<() => void>(() => () => {});

  const openDialog = useCallback(
    ({ title = "", body, onConfirm, onCancel }: DialogConfig) => {
      setTitle(title);
      setContent(body);
      setOnConfirm(() => onConfirm);
      setOnCancel(() => onCancel);
      setOpen(true);
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setOpen(false);
    // Opcional: limpar estado ao fechar
    setTimeout(() => {
      setContent(null);
      setTitle("");
      setOnConfirm(() => () => {});
      setOnCancel(() => () => {});
    }, 300); // Ajuste o timeout se necessário para coincidir com animações
  }, []);

  const handleCancel = () => {
    onCancel?.();
    closeDialog();
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="customized-dialog-title"
      >
        {title && (
          <DialogTitle id="customized-dialog-title">{title}</DialogTitle>
        )}
        <DialogContent dividers>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={() => {
              onConfirm();
              closeDialog();
            }}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};
