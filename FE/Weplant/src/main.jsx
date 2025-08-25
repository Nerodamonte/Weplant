import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MainPage from "./pages/mainPage.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainPage />
  </StrictMode>
);
