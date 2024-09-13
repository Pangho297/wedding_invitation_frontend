import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd-mobile";
import koKR from "antd-mobile/es/locales/ko-KR";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider locale={koKR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
