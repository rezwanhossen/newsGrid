import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Layout/Root";
import Home from "../Components/Home/Home";
import Compare from "../Components/Home/FeaturedSection/Compare/Compare";

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
        path : '/compare/:keyword',
        element : <Compare></Compare>
      }
    ],
  },
]);
export default router;
