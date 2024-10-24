import { AiOutlineLike } from "react-icons/ai";
import ReadMoreLink from "./ReadMoreLink";
import { useEffect, useState } from "react";
import useAuth from "./../Hook/useAuth/useAuth";
import axios from "axios";
import { toast } from "react-hot-toast";

const Card = ({ news, idx }) => {
  const reactions = [
    { name: "Like", imageUrl: "https://i.ibb.co/pdf8DDd/like-1.gif" },
    { name: "Love", imageUrl: "https://i.ibb.co/LhVYFsK/love.gif" },
    { name: "Care", imageUrl: "https://i.ibb.co/Tqh5pQ5/care.gif" },
    { name: "Haha", imageUrl: "https://i.ibb.co/0cSgbBv/haha-1.gif" },
    { name: "Sad", imageUrl: "https://i.ibb.co/SdB38Xp/sad-2.gif" },
    { name: "Angry", imageUrl: "https://i.ibb.co/fFGrSY1/angry.gif" },
  ];

  const [reactionData, setReactionData] = useState([]);
  const [uniqueReactionData, setUniqueReactionData] = useState([]);
  const { user } = useAuth();
  const userEmail = user?.email;

  // Fetch reaction data from the server
  useEffect(() => {
    const getReactionData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/getstoredata/${userEmail}`
        );
        setReactionData(res?.data || []);
      } catch (error) {
        console.error("Error fetching reaction data:", error);
      }
    };
    if (userEmail) {
      getReactionData();
    }
  }, [userEmail]);

  // Filter unique reaction data based on idx
  useEffect(() => {
    if (reactionData.length > 0) {
      const uniqueData = reactionData.filter(
        (reaction) => reaction.idss === idx
      );
      setUniqueReactionData(uniqueData);
    } else {
      setUniqueReactionData([]);
    }
  }, [reactionData, idx]);

  const [storeIconName, setStoreIconName] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [loveCount, setLoveCount] = useState(0);
  const [careCount, setCareCount] = useState(0);
  const [hahaCount, setHahaCount] = useState(0);
  const [sadCount, setSadCount] = useState(0);
  const [angryCount, setAngryCount] = useState(0);
  const [idss, setIdss] = useState(null);

  // Select icon handler
  const handleClickIcon = (names, idx) => {
    setStoreIconName(names);
    setIdss(idx);

    switch (names) {
      case "Like":
        setLikeCount((prev) => prev + 1);
        break;
      case "Love":
        setLoveCount((prev) => prev + 1);
        break;
      case "Care":
        setCareCount((prev) => prev + 1);
        break;
      case "Haha":
        setHahaCount((prev) => prev + 1);
        break;
      case "Sad":
        setSadCount((prev) => prev + 1);
        break;
      case "Angry":
        setAngryCount((prev) => prev + 1);
        break;
      default:
        break;
    }
  };

  // Send reaction data to the server when a reaction is selected
  useEffect(() => {
    if (storeIconName) {
      const reactionObj = {
        storeIconName,
        likeCount,
        loveCount,
        careCount,
        hahaCount,
        sadCount,
        angryCount,
        userEmail,
        idss,
      };

      const postLikeData = async () => {
        try {
          const res = await axios.post(
            "http://localhost:5000/storelike",
            reactionObj
          );
          console.log("hi res", res);

          if (res.status == 200) {
            alert("reaction changed");
          }
          if (res.data.insertedId) {
            toast.success("Successfully added reaction data!");
          }
        } catch (error) {
          console.error("Error posting reaction data:", error);
        }
      };

      postLikeData();
    }
  }, [
    storeIconName,
    likeCount,
    loveCount,
    careCount,
    hahaCount,
    sadCount,
    angryCount,
    userEmail,
    idss,
  ]);

  return (
    <div className="bg-white transition-all duration-500 transform hover:scale-105 overflow-hidden shadow-md shadow-gray-700 relative">
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

        <div className="p-5 heebo">
          <h3 className="text-xl text-[#4A4A4A] font-medium">
            {news?.title.slice(0, 45)}...
          </h3>
          <ReadMoreLink news={news}></ReadMoreLink>
        </div>

        <div className="relative group mt-4">
          {userEmail && (
            <div className="w-10 my-5 h-10 flex justify-center items-center mx-auto cursor-pointer">
              {reactionData.length > 0 && uniqueReactionData.length > 0 ? (
                <img
                  src={
                    reactions.find(
                      (reaction) =>
                        reaction.name === uniqueReactionData[0]?.storeIconName
                    )?.imageUrl
                  }
                  alt={uniqueReactionData[0]?.storeIconName || "loading..."}
                  className="w-8 h-8"
                />
              ) : (
                <AiOutlineLike className="text-4xl text-gray-500" />
              )}
            </div>
          )}

          <div className="absolute bottom-8 left-0 right-0 mx-auto flex justify-center space-x-2 bg-gray-100 p-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out">
            {reactions.map((reaction, index) => (
              <img
                onClick={() => handleClickIcon(reaction.name, idx)}
                key={index}
                className="w-8 h-8 cursor-pointer"
                src={reaction.imageUrl}
                alt={reaction.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
