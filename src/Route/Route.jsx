import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Layout/Root";
import Home from "../Components/Home/Home";
import Compare from "../Components/Home/FeaturedSection/Compare/Compare";
import SignUp from "../Components/LoginRegister/SingUp/SignUp";
import Login from "../Components/LoginRegister/Login/Login";
import Erroe from "../Components/Pages/Error/Erroe";

import News from "../Components/Pages/News/News";

import Dashbord from "../Components/Layout/Dashbord";
import AddNews from "../Components/DashbordPage/AddNews/AddNews";

import Bookmark from "../Components/Bookmark/Bookmark";

import Alluser from "../Components/DashbordPage/AdminPage/AllUser/Alluser";
import PrivateRoute from "../Components/Fairbase/PrivateRoute";
import UserHome from "../Components/DashbordPage/UserPage/UserHome";
import UsersDeshboard from "./../Components/UsersDeshboard/UsersDeshboard";

import DownloadsNews from "../Components/DownloadsNews/DownloadsNews";
import MyNews from "../Components/DashbordPage/MyNews/MyNews";
import AddedNews from "../Components/DashbordPage/AdminPage/AddedNews/AddedNews";
import CategoriesNews from "../Components/Pages/CategoriesNews/NewsCategory/CategoriesNews";
import NewsSearch from "../Components/Pages/NewsSearch/NewsSearch";
import Payment from "../Components/DashbordPage/Payment/Payment";

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
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/bookmark",
        element: <Bookmark></Bookmark>,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/categoriesNews/:category",
        element: <CategoriesNews></CategoriesNews>,
      },
      {
        path: "/downloads",
        element: <DownloadsNews></DownloadsNews>,
      },
      {
        path: "/newsSearch",
        element: <NewsSearch></NewsSearch>,
      },
    ],
  },

  {
    path: "dashbord",
    element: (
      <PrivateRoute>
        <Dashbord></Dashbord>
      </PrivateRoute>
    ),
    children: [
      {
        path: "userProfile",
        element: <UsersDeshboard></UsersDeshboard>,
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "addnews",
        element: <AddNews></AddNews>,
      },
      {
        path: "myNews",
        element: <MyNews></MyNews>,
      },
      {
        path: "payment",
        element: <Payment />,
      },

      //admin route
      {
        path: "users",
        element: <Alluser></Alluser>,
      },
      {
        path: "addedNews",
        element: <AddedNews></AddedNews>,
      },
    ],
  },
]);

export default router;
