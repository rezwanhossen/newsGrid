import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer/Footer";
import Navbar from "../Pages/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Root = () => {
  
  const [allNews , setAllNews] = useState([]);
  
  const [allNewsLocalStorage , setAllNewsLocalStorage] = useState([]);


  // redux
  const locationBasedNews = useSelector((state) => state?.allNews?.locationBasedNews);
  const categoriesNews = useSelector((state) => state?.allNews?.categoriesNews);
  console.log("allNewsLocalStorage" , allNewsLocalStorage  , locationBasedNews , categoriesNews);
  

  
  

  
  
  useEffect(() => {
      const news = [
          ...allNews,
          ...locationBasedNews,
          ...categoriesNews
      ]
      localStorage.setItem("allNewsData" , JSON.stringify(news));
  
  
      const data = localStorage.getItem('allNewsData');
  const newsAll = JSON.parse(data);
  
  setAllNewsLocalStorage(newsAll)
  } , [allNews , locationBasedNews, categoriesNews])

  
  return (
    <div>
      
      
      <Navbar allNews={allNewsLocalStorage}/>
      <div className="mt-32">
      
      
      <Outlet context={{setAllNews}}></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
