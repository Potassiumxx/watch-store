import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import UserProfile from "../pages/Profile/UserProfile";
import AdminProductPage from "../pages/Profile/admin/AdminProductPage";
import UserAccount from "../pages/Profile/account/UserAccount";
import Products from "../pages/Products/Products";
import SingleProductPage from "../pages/Products/SingleProduct";

export default function Router() {
  const router = createBrowserRouter(
    [
      {
        element: <App />,
        children: [
          { path: "*", element: <ErrorPage /> },
          { path: "/", element: <Home /> },
          { path: "/products", element: <Products /> },
          { path: "/product/:id", element: <SingleProductPage /> },
          {
            path: "/profile",
            element: <UserProfile />,
            children: [
              { index: true, element: <UserAccount /> },
              { path: "product-management", element: <AdminProductPage /> },
            ],
          },
        ],
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
      },
    }
  );

  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}
