import { createTheme } from "@mui/material/styles";
import { red, blue, grey, blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#24438F",
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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "10px 16px",
        },
        containedPrimary: {
          backgroundColor: "#24438F",
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
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "13.5px 14px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          color: grey[800],
          fontFamily: "var(--font-roboto)",
        },
        inputRoot: {
          padding: "6px",
        },
        root: {
          color: grey[800],
          fontFamily: "var(--font-roboto)",
        },
        popper: {
          marginTop: "10px !important",
        },
        option: {
          fontSize: "13px",
          fontFamily: "var(--font-roboto)",
        },
      },
    },
  },
});

export default theme;
