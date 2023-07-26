'use client'

import GlobalStyles from '@/app/styles/GlobalStyles';
import theme from '@/app/styles/theme';
import { ThemeProvider } from '@mui/material/styles';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}
