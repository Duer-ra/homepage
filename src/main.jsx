import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DuevoxLanding from "./DuevoxLanding.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DuevoxLanding ctaHref="#waitlist" />
  </StrictMode>
);