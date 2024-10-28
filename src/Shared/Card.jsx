import { useState } from "react";
import ReadMoreLink from "./ReadMoreLink";
import { FaRegComment } from "react-icons/fa";
import useAuth from "../Hook/useAuth/useAuth";
import toast from "react-hot-toast";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa"; // Import like icons
import useAxiosCommon from "../Hook/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CiShare2 } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Card = ({ news }) => {
  const [modalComment, setModalComment] = useState(false);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const { user } = useAuth();
  const naviget = useNavigate();
  const axioscommon = useAxiosCommon();
  const { data: messages = [], refetch: revrefetch } = useQuery({
    queryKey: ["messages", news._id],
    queryFn: async () => {
      const { data } = await axioscommon.get(`/message/${news._id}`);
      return data;
    },
  });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;
    const newsId = news?._id;
    const newsTitle = news?.title;
    const email = user?.email;
    const userImg = user?.photoURL;
    const name = user?.displayName;
    const messages = {
      message,
      newsId,
      newsTitle,
      email,
      name,
      userImg,
    };

    if (user) {
      const res = await axioscommon.post("/message", messages);
      if (res.data.insertedId) {
        toast.success("revies successfilly !");
      }

      revrefetch();
    } else {
      toast.error("you are not login please first login");
      naviget("/login");
    }
    setModalComment(false);
  };
  const handleViewMoreComments = () => {
    setVisibleStartIndex((prevIndex) =>
      prevIndex + 2 >= messages.length ? 0 : prevIndex + 2
    );
  };
  const { data: likeCountData = { count: 0 }, refetch: refetchLikeCount } =
    useQuery({
      queryKey: ["likeCount", news._id],
      queryFn: async () => {
        const { data } = await axioscommon.get(`/likeCount/${news._id}`);
        return data;
      },
    });

  const { data: likesData = {}, refetch } = useQuery({
    queryKey: ["likeStatus", news._id, user?.email],
    queryFn: async () => {
      const { data } = await axioscommon.get(
        `/likeStatus/${news._id}/${user?.email}`
      );
      return data;
    },
    enabled: !!user, // Only fetch if user is logged in
  });

  const liked = likesData?.liked || false;
  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like.");
      naviget("/login");
      return;
    }

    const email = user.email;
    const newsId = news._id;
    const likeStatus = !liked;
    try {
      const res = await axioscommon.post("/LikeCount", {
        newsId,
        email,
        like: likeStatus ? 1 : 0,
      });
      if (res.data.success) {
        toast.success(likeStatus ? "Liked!" : "Unliked!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update like status.");
    }
  };

  return (
    <div className="bg-white transition-all duration-500 transform hover:scale-105 overflow-hidden shadow-md shadow-gray-700">
      <div className="relative">
        <div className="w-full h-[166px]">
          <img
            src={
              news?.urlToImage ||
              news?.image ||
              news?.image_url ||
              news?.url_image
            }
            alt=""
            className="h-full object-cover w-full"
          />
        </div>

        <div className="p-3 heebo">
          <h3 className="text-xl text-[#4A4A4A] font-medium">
            {news?.title.slice(0, 35)}...
          </h3>
          <ReadMoreLink news={news}></ReadMoreLink>
        </div>

        <div className="flex justify-around my-3">
          <button
            className={`flex items-center gap-1 ${
              liked ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={handleLike}
          >
            {liked ? <FaThumbsUp /> : <FaRegThumbsUp />} {likeCountData.count}{" "}
            Like
          </button>
          <button
            className=" flex items-center gap-1"
            onClick={() => setModalComment(true)}
          >
            <FaRegComment /> {messages.length} Comment
          </button>
          <button className=" flex items-center gap-1">
            <CiShare2 /> Share
          </button>
        </div>
      </div>

      {/* Modal for adding comments */}

      {modalComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white p-4 rounded-lg w-96 relative  shadow-lg overflow-y-auto max-h-72">
            <button
              onClick={() => setModalComment(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &#x2715; {/* X icon */}
            </button>
            <h2 className="text-lg font-semibold mb-2">Comments</h2>

            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="w-full  border border-gray-300 overflow-y-auto rounded-md p-1"
                placeholder="Write your comment here..."
                name="message"
              ></textarea>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-4 py-1 bg-blue-600 text-white rounded"
                >
                  Comment
                </button>
              </div>
            </form>

            <div className="mb-3 space-y-1 overflow-y-auto ">
              {messages.length > visibleStartIndex + 2 && (
                <button
                  onClick={handleViewMoreComments}
                  className="text-blue-600 mt-2"
                >
                  View More Comments
                </button>
              )}
              {messages.length > 0 ? (
                messages
                  .slice(visibleStartIndex, visibleStartIndex + 2)
                  .map((comment) => (
                    <div key={comment._id} className="border-b p-2">
                      <div className=" flex justify-between">
                        <div className="flex items-center gap-2 text-gray-800">
                          <img
                            src={comment?.userImg}
                            alt=""
                            className="w-6 h-6 rounded-full"
                          />
                          <h1 className="font-semibold">{comment?.name}</h1>
                        </div>
                        <h2>
                          <HiOutlineDotsHorizontal />
                        </h2>
                      </div>
                      <p className="text-gray-700">{comment?.message}</p>
                    </div>
                  ))
              ) : (
                <p className="text-gray-600">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
