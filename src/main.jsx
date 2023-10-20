import ReactDOM from "react-dom/client";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

  <AnimatePresence>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AnimatePresence>
  
);
