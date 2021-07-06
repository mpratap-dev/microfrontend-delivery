import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme';
import Sidebar from "./components/common/sidebar";

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
