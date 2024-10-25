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
        
  
          
            const response = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${import.meta.env.VITE_NAIMUL_API_KEY }`);
            // console.log("response : " , response.data);
          const news = response?.data?.articles.filter(
            (news) => news.title && news.urlToImage
          );
          // console.log("newssss : " , news);
          dispatch(setNewsData(news))
  
          return news;
      },
});
  // console.log(" newsData : " , newsData)
    return [newsData , isLoading]
  
};

export default useNews;