import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

import StarRating from "./StarRating/StarRating";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating />
  </React.StrictMode>
);
