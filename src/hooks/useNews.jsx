import { useQuery } from "@tanstack/react-query";
import axios from "axios";






const useNews = () => {
    
  
      
  
    const { data: newsData = [], isLoading } = useQuery({
      queryKey: ["news"],
      queryFn: async () => {
        
  
          
            const response = await axios.get(`http://localhost:5000/all-news`);
            // console.log("response : " , response.data);
          const news = response?.data?.data?.articles.filter(
            (news) => news.title && news.urlToImage
          );
          console.log("newssss : " , news);
  
          return news;
      },
});

    return [newsData , isLoading]
  
};

export default useNews;