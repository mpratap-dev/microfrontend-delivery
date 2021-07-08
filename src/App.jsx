import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import theme from "./utils/theme";
import Sidebar from "./layout/sidebar";
import Main from "./layout/main";
import store from "./store";

const App = (props) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <div style={{ display: "flex" }}>
          <Sidebar appName={props.name} />
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

export default App;
