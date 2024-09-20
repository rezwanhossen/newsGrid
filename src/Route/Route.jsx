import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Layout/Root";
import Home from "../Components/Home/Home";

import Compare from "../Components/Home/FeaturedSection/Compare/Compare";

import SignUp from "../Components/LoginRegister/SingUp/SignUp";
import Login from "../Components/LoginRegister/Login/Login";
import Erroe from "../Components/Pages/Error/Erroe";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Erroe />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {

        path : '/compare/:keyword',
        element : <Compare></Compare>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

    ],
  },
]);
export default router;
