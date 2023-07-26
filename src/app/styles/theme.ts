import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          marginTop: '10px !important',
        },
      },
    },
  },
});

export default theme;