import { createTheme } from "@mui/material/styles";
import { red, blue, grey, blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: red[700],
    },
    background: {
      default: blueGrey[50],
      paper: "#ffffff",
    },
    text: {
      primary: grey[800],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: blue[700],
          "&:hover": {
            backgroundColor: blue[800],
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          fontFamily: "var(--font-roboto)",
          "& input:-webkit-autofill": {
            WebkitTextFillColor: grey[800],
            WebkitBoxShadow: "0 0 0 100px #ffffff inset",
            transition: "background-color 5000s ease-in-out 0s",
          },
          "& input:-webkit-autofill:focus": {
            WebkitTextFillColor: grey[800],
            WebkitBoxShadow: "0 0 0 100px #ffffff inset",
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(14px, -6px) scale(0.75)",
          },
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
