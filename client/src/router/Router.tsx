import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: "*", element: <ErrorPage /> },
        { path: "/", element: <Home /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
