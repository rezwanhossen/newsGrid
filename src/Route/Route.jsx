import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Layout/Root";
import Home from "../Components/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'/register',
        
      },
      {
        path:'/login',
        
      }
    ],
  },
]);
export default router;
