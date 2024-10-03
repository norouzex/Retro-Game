import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
