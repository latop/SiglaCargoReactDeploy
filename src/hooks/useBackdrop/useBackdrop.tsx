import React, { createContext, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { atom, useRecoilState } from 'recoil';

export const backdropState = atom<boolean>({
  key: 'backdropState',
  default: false,
});

interface BackdropContextType {
  openBackdrop: () => void;
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
  const [isOpenBackdrop, setIsBackdrop] = useRecoilState(backdropState);

  const openBackdrop = () => setIsBackdrop(true);
  const closeBackdrop = () => setIsBackdrop(false);

  return (
    <BackdropContext.Provider value={{ openBackdrop, closeBackdrop, isOpenBackdrop }}>
        {children}
      <Backdrop
        data-testid="backdrop-container"
        open={isOpenBackdrop}
        data-visible={isOpenBackdrop}
        onClick={closeBackdrop}
      />
    </BackdropContext.Provider>
  );
};

export { BackdropProvider, BackdropContext };

export const useBackdrop = (): BackdropContextType => {
  const context = useContext(BackdropContext);
  if (context === undefined) {
    throw new Error('useBackdrop must be used within a BackdropProvider');
  }
  return context;
};
