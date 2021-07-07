import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";
import Sidebar from "./layout/sidebar";
import Main from "./layout/main";

const App = (props) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar appName={props.name} />
        <Main />
      </div>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
