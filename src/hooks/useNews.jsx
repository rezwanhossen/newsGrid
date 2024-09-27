import axios from "axios";
import { useEffect, useState } from "react";



const useNews = (country = 'us' , category = 'business') => {
    
    const [newsData, setNewsData] = useState([]);
    console.log("newssss " , newsData , "category" , category , country);
    const apiKey = "c3d149c46a6d4f22a1d2d47a0cba86a1";
    const getNews = async() => {
        let allArticles = [];
        for (let page = 1; page <= 5; page++) {
            // await new Promise(resolve => setTimeout(resolve, 1000));
          const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
          );
          allArticles = [...allArticles, ...response.data.articles];
        }
        console.log(allArticles);
        setNewsData(allArticles);
    }
    useEffect(() => {
            getNews()
    } , [country , category])
    return [newsData];
};

export default useNews;