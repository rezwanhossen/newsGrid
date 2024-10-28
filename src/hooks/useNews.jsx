import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setNewsData } from "../features/allNews/allNewsSlice";






const useNews = () => {
    // redux 
  const dispatch = useDispatch();
  
      
  
    const { data: newsData = [], isLoading } = useQuery({
      queryKey: ["news"],
      queryFn: async () => {
        
  
          
            const response = await axios.get(https://api.currentsapi.services/v1/latest-news , {
              params : {
                apiKey : import.meta.env.VITE_NAIMUL_API_KEY,
                page_size : 30
              }
            });
            // console.log("response : " , response.data);
          const news = response?.data?.news.filter((news) => news.title && news?.image);
          // console.log("newssss : " , news);
          dispatch(setNewsData(news))
  
          return news;
      },
});
  console.log(" newsData : " , newsData)
    return [newsData , isLoading]
  
};

export default useNews;