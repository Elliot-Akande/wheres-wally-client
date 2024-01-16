import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import HomePage from "./components/HomePage.jsx";
import DetailsPage from "./components/DetailsPage.jsx";
import GamePage from "./components/GamePage.jsx";

const routesConfig = [
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
];

export default routesConfig;
