import ReactDOM from "react-dom/client";
import { HashRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

    <HashRouter>
      <App />
    </HashRouter>
  
);
