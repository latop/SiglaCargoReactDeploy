import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          fontFamily: "var(--font-roboto)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-roboto)",
          color: grey[800],
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-roboto)",
          color: grey[800],
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          color: grey[800],
          fontFamily: "var(--font-roboto)",
        },
        root: {
          color: grey[800],
          fontFamily: "var(--font-roboto)",
        },
        popper: {
          marginTop: "10px !important",
        },
      },
    },
  },
});

export default theme;
