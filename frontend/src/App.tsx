import Router from "./router";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@material-ui/core";

import "./global.css";

const theme = createTheme({
  palette: {
    primary: {
      dark: "#FF3D68",
      main: "#A73489",
    },
    secondary: {
      light: "#FAAD80",
      main: "#A73489",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Roboto",
    },
    h1: {
      fontFamily: "Rubik",
      fontSize: "3rem",
      fontWeight: 500,
      letterSpacing: "1px",
    },
    button: {
      fontWeight: 500,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
