import { useQuery } from "@tanstack/react-query";
import axios from "axios";






const useNews = () => {
    
  
      
  
    const { data: newsData = [], isLoading } = useQuery({
      queryKey: ["news"],
      queryFn: async () => {
        
  
          
            const response = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=950d4efc55c24a31bf9a060eaf29f5fb`);
            console.log("response : " , response.data);
          const news = response?.data?.articles.filter(
            (news) => news.title && news.urlToImage
          );
          // console.log("newssss : " , news);
  
          return news;
      },
});

    return [newsData , isLoading]
  
};

export default useNews;