// 为什么需要content
// https://blog.csdn.net/dengqiu2187/article/details/101510023
// https://www.cnblogs.com/champagne/p/4844682.html
import React, { FC } from "react";
import ReactDOM from "react-dom";
// import MainModal from "./components/mainModal";
// import "./antd-diy.css";
import "./index.less";

const Content: FC = () => {
  return <div>123</div>;
};

const app = document.createElement("div");
app.id = "CRX-container";
document.body.appendChild(app);

ReactDOM.render(<Content />, app);

try {
  let insertScript = document.createElement("script");
  insertScript.setAttribute("type", "text/javascript");
  insertScript.src = window.chrome.extension.getURL("insert.js");
  document.body.appendChild(insertScript);
} catch (err) {}
