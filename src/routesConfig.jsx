import App from "./App.jsx";
import Error from "./pages/Error/index.jsx";
import Home from "./pages/Home/index.jsx";
import LevelDetails from "./pages/LevelDetails/index.jsx";
import Game from "./pages/Game/index/index.jsx";

const routesConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "level/:levelId/details", element: <LevelDetails /> },
      { path: "level/:levelId", element: <Game /> },
    ],
  },
];

export default routesConfig;
