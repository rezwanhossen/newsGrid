import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth/useAuth";
import axios from "axios";

const Bookmark = () => {
  const user = useAuth();
  const [bookmark, setBookmark] = useState([]);
  useEffect(() => {
    const getBookmarkData = async () => {
      const { data } = await axios(
        `http://localhost:5000/bookmarks/${user?.email}`,
        
      );
      setBookmark(data);
    };
    getBookmarkData();
  }, [user]);
  return (
    <div>
      <button>Bookmarks</button>
    </div>
  );
};

export default Bookmark;
