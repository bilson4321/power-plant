import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./app.tsx";
import { SWRConfig } from "swr";
import SWROption from "./swr.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig value={SWROption}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);
