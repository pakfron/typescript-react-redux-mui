import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={routers} />;
}
