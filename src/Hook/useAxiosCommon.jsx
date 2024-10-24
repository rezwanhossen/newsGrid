import axios from "axios";

const axiosCommon = axios.create({
  baseURL: "https://news-grid-server.vercel.app",
});
const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
