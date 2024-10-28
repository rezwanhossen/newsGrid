import axios from "axios";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: "https://news-grid-server.vercel.app",
  });

  return axiosPublic;
};

export default useAxiosPublic;
