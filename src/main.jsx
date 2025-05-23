import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (import.meta.env.MODE === "development") {
  import("@stagewise/toolbar-react").then(({ StagewiseToolbar }) => {
    const config = { plugins: [] };
    const toolbarRoot = document.createElement("div");
    document.body.appendChild(toolbarRoot);
    import("react-dom/client").then(({ createRoot }) => {
      createRoot(toolbarRoot).render(<StagewiseToolbar config={config} />);
    });
  });
}
