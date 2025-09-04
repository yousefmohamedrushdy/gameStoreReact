import { createRoot } from "react-dom/client";
import MainLayout from "./Layout/mainLayout.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/index.css";

createRoot(document.getElementById("root")).render(
  <>
    <MainLayout />
  </>
);
