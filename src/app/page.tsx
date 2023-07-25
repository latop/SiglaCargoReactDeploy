'use client'

import GlobalStyles from './GlobalStyles';
import { HomeTemplate } from '@/templates';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
});

const Page = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <HomeTemplate />
  </ThemeProvider>
)


export default Page;