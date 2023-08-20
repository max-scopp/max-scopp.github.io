import { render } from "preact";
import { RouterProvider } from "react-router-dom";
import "./global.scss";
import router from "./router.tsx";

const appRoot = document.getElementById("app");

if (!appRoot) {
  throw new Error("#app not found");
}

render(<RouterProvider router={router} />, appRoot);
