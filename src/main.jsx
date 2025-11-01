import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CursorDot from "./components/CursorDot.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CursorDot
        size={16}
        hoverSize={32}
        color="#000000"
        hoverColor="#FFFFFF"
        enableHoverEffect={true}
      />
      <App />
    </BrowserRouter>
  </StrictMode>
);
