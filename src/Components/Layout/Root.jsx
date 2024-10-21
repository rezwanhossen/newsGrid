import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer/Footer";
import Navbar from "../Pages/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Root = () => {
  
  const [allNews , setAllNews] = useState([]);
  const [allNewsData , setAlNewsData] = useState([]);
  const [allNewsLocalStorage , setAllNewsLocalStorage] = useState([]);
  const locationBasedNews = useSelector((state) => state?.allNews?.locationBasedNews);

  
  

  useEffect(() => {
    if(allNews?.length > 0 && locationBasedNews?.length > 0){
      console.log("ottoi")
        localStorage.setItem("allNewsData" , JSON.stringify(allNewsData));
  
  
        const data = localStorage.getItem('allNewsData');
    const news = JSON.parse(data);
    // console.log("newsssssss : " , news)
    setAllNewsLocalStorage(news)
    }
    // console.log("locationBasedNews : " , locationBasedNews , allNewsData?.length);
  } , [allNewsData])
  // console.log("allNewsRoot" , allNews);
  useEffect(() => {
      const news = [
          ...allNews,
          ...locationBasedNews
      ]
      setAlNewsData(news);
  } , [allNews , locationBasedNews])

  
  return (
    <div>
      {/* inputValue={inputValue} setInputValue={setInputValue} */}
      
      <Navbar allNews={allNewsLocalStorage}/>
      <div className="mt-32">
      {/* [inputValue] , */}
      
      <Outlet context={{setAllNews}}></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
