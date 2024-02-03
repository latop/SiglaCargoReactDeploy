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
        inputRoot: {
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        },
        popper: {
          marginTop: "10px !important",
        },
      },
    },
  },
});

export default theme;
