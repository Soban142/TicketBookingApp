import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SearchContextPovider } from "./context/searchContext";
import { AuthContextPovider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextPovider>
      <SearchContextPovider>
        <App />
      </SearchContextPovider>
    </AuthContextPovider>
  </React.StrictMode>
);
