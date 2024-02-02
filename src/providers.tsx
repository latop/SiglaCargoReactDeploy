"use client";

import GlobalStyles from "@/styles/GlobalStyles";
import { RecoilRoot } from "recoil";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </RecoilRoot>
  );
}
