import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "@material-tailwind/react";

// ✅ Apply theme BEFORE anything is rendered
const savedTheme = localStorage.getItem("theme") || "dark";
const html = document.documentElement;

if (savedTheme === "dark") {
  html.classList.add("dark");
  html.classList.remove("light");
} else if (savedTheme === "light") {
  html.classList.remove("dark");
  html.classList.add("light");
} else {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  html.classList.toggle("dark", isDark);
  html.classList.toggle("light", !isDark);
}

const App = () => (
  <ThemeProvider>
    <AppRouter />
  </ThemeProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
