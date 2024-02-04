import React, { createContext, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import { atom, useRecoilState } from "recoil";

interface BackdropState {
  open: boolean;
  onClose: () => void;
}

export const backdropState = atom<BackdropState>({
  key: "backdropState",
  default: {
    open: false,
    onClose: () => {},
  },
});

interface BackdropContextType {
  openBackdrop: (options?: { onClose: () => void }) => void;
  closeBackdrop: () => void;
  isOpenBackdrop: boolean;
}

interface BackdropProviderProps {
  children: React.ReactNode;
}

const BackdropContext = createContext<BackdropContextType>({
  openBackdrop: () => {},
  closeBackdrop: () => {},
  isOpenBackdrop: false,
});

const BackdropProvider = ({ children }: BackdropProviderProps) => {
  const [backdrop, setIsBackdrop] = useRecoilState(backdropState);

  const openBackdrop = (options?: { onClose: () => void }) => {
    setIsBackdrop({
      open: true,
      onClose: options?.onClose || (() => {}),
    });
  };
  const closeBackdrop = () => {
    backdrop.onClose?.();
    setIsBackdrop({
      open: false,
      onClose: () => {},
    });
  };

  return (
    <BackdropContext.Provider
      value={{ openBackdrop, closeBackdrop, isOpenBackdrop: backdrop.open }}
    >
      {children}
      <Backdrop
        data-testid="backdrop-container"
        open={backdrop.open}
        onClick={closeBackdrop}
        data-visible={backdrop.open}
      />
    </BackdropContext.Provider>
  );
};

export { BackdropProvider, BackdropContext };

export const useBackdrop = (): BackdropContextType => {
  const context = useContext(BackdropContext);
  if (context === undefined) {
    throw new Error("useBackdrop must be used within a BackdropProvider");
  }
  return context;
};
