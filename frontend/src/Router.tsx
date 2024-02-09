import { createBrowserRouter } from "react-router-dom";
import { Inspiration } from "./sites/Inspiration";
import { About } from "./sites/About";
import { Selling } from "./sites/Selling";
import { Layout } from "./components/Layout";
import { Chat } from "./sites/Chat";

// Hantera ev fel med denna sida(Layouten). errorElement:<NotFound></NotFound>,

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <About></About>,
        index: true,
      },
      {
        path: "/selling",
        element: <Selling></Selling>,
      },
      {
        path: "/inspiration",
        element: <Inspiration></Inspiration>,
      },
      {
        path: "/chat",
        element: <Chat></Chat>,
      },
    ],
  },
]);
