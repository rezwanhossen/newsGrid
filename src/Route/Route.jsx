import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Layout/Root";
import Home from "../Components/Home/Home";
import Compare from "../Components/Home/FeaturedSection/Compare/Compare";
import SignUp from "../Components/LoginRegister/SingUp/SignUp";
import Login from "../Components/LoginRegister/Login/Login";
import Erroe from "../Components/Pages/Error/Erroe";
import Dashbord from "../Components/Layout/Dashbord";
import AddNews from "../Components/DashbordPage/AddNews/AddNews";
import Bookmark from "../Components/Bookmark/Bookmark";


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
        path: "/compare/:keyword",
        element: <Compare></Compare>,
      },
      {
        path: "/compare/:keyword",
        element: <Compare></Compare>,
      },
      {
        path: "/singup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/bookmark",
        element: <Bookmark></Bookmark>
      }
    ],
  },
  {
    path: "dashbord",
    element: <Dashbord></Dashbord>,
    children: [
      {
        path: "addnews",
        element: <AddNews></AddNews>,
      },
     
     
    ],
  },
]);
export default router;
