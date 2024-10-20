import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer/Footer";
import Navbar from "../Pages/Navbar/Navbar";
import { useState } from "react";

const Root = () => {
  
  const [allNews , setAllNews] = useState([]);
  // console.log("allNewsRoot" , allNews);


  return (
    <div>
      {/* inputValue={inputValue} setInputValue={setInputValue} */}
      
      <Navbar allNews={allNews}/>
      <div className="mt-32">
      {/* [inputValue] , */}
      
      <Outlet allNews={allNews} context={{setAllNews}}></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
