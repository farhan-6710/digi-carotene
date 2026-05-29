import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { getStoredThemePreference } from "./lib/themePreferenceStorage.ts";

const storedTheme = getStoredThemePreference();
if (storedTheme === "dark") {
  document.body.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
