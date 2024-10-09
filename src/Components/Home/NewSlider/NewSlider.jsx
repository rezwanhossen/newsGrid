import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewsSlider = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const API_KEY = '555aeff5-d687-436d-ae93-9f4d9cd8e252';
      const url = `https://content.guardianapis.com/search?api-key=${API_KEY}&show-fields=headline,thumbnail`;
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.response.results);
    };
    fetchArticles();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {articles.map((article) => (
        <div key={article.id} className="relative w-full h-auto">
          <div className="w-full h-full overflow-hidden">
            <img
              src={article.fields.thumbnail}
              alt={article.webTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-2xl font-bold">{article.fields.headline}</h2>
          </div>
        </div>   
      ))}
    </Slider>
  );
};

export default NewsSlider;
