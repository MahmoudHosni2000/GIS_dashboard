import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "@material-tailwind/react";

const App = () => (
  <ThemeProvider>
    <AppRouter />
  </ThemeProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
