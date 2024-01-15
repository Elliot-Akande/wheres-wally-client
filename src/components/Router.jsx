import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import HomePage from "./HomePage.jsx";
import DetailsPage from "./DetailsPage.jsx";
import GamePage from "./GamePage.jsx";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "level/:levelNum/details", element: <DetailsPage /> },
        { path: "level/:levelNum", element: <GamePage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
