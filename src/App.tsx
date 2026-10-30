import { createBrowserRouter, RouterProvider } from "react-router";
import Teams from "./pages/Teams";
import Games from "./pages/Games";
import Home from "./pages/Home";
import MainLayout from "./layouts/LayoutPrincipal";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/teams",
        element: <Teams />,
      },
      {
        path: "/games",
        element: <Games />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
