import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Legal from "./pages/Legal/Legal";
import Printing from "./pages/Printing/Printing";
import Stack from "./pages/Stack/Stack";
import NotFound from "./pages/NotFound/NotFound";
import App from "./components/App/App";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "stack",
        element: <Stack />,
      },
      {
        path: "3d-printing",
        element: <Printing />,
      },
      {
        path: "legal",
        element: <Legal />,
      },
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
