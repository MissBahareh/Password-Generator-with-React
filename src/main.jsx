import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Second from "./components/Second";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Second />
  </StrictMode>
);
