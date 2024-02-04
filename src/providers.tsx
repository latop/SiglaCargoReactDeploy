"use client";

import GlobalStyles from "@/styles/GlobalStyles";
import { RecoilRoot } from "recoil";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { BackdropProvider } from "./hooks/useBackdrop/useBackdrop";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BackdropProvider>{children}</BackdropProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}
