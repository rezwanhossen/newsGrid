import { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const VideoNews = ({ setAllVideosNews }) => {
  const [videoNews, setVideoNews] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Your provided YouTube API key
  const apiKey = "AIzaSyAr_gVn7k9Q8Q2aVA8TslOyXVpomFEWcPU";

  const searchQuery = "breaking news";

  // Fetch video news from YouTube API
  const fetchVideoNews = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            maxResults: 9,
            q: searchQuery,
            type: "video",
            key: apiKey,
          },
        }
      );

      const videos = response.data.items;
      setVideoNews(videos);

      // Ensure videos exist before setting
      if (videos.length > 0) {
        setSelectedVideo(videos[0]);
      }

      setAllVideosNews(videos);
    } catch (error) {
      console.error("Error fetching video news:", error);
    }
  };

  useEffect(() => {
    fetchVideoNews();
  }, []);

  return (
    <div className="mt-8 bg-[#F2F4F6] px-5 pt-3 pb-7 rounded-lg w-full">
      <h1 className="text-2xl md:text-3xl text-[#00A6A6] border-b-2 border-[#007E7E] font-extrabold mb-6 pb-2">
        Video News
      </h1>

      {/* Video Player Section */}
      {selectedVideo && selectedVideo.id && selectedVideo.id.videoId && (
        <div className="mb-6">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`}
            controls
            width="100%"
            height="400px"
          />
          <h3 className="text-xl font-semibold text-[#4A4A4A] leading-tight mt-4">
            {selectedVideo.snippet.title}
          </h3>
          <p className="text-sm text-[#767676] mt-2 leading-snug">
            {selectedVideo.snippet.description}
          </p>
        </div>
      )}

      {/* Video Thumbnails Section */}
      <h3 className="text-xl font-semibold mb-2 text-[#3BAFDA] border-b border-[#007E7E] pb-1">
        More Video News
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videoNews.map((video) => (
          <div
            key={video.id.videoId}
            className="cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-32 object-cover rounded-lg"
            />
            <h4 className="text-sm font-semibold mt-2 text-[#4A4A4A] leading-tight">
              {video.snippet.title}
            </h4>
            <p className="text-xs text-[#767676]">
              {new Date(video.snippet.publishedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoNews;
