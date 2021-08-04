import Router from "./router";
import { ThemeProvider, createTheme } from "@material-ui/core";

import "./global.css";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Roboto",
    },
    button: {
      fontWeight: 500,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
