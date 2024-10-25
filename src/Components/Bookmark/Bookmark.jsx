import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth/useAuth";
import axios from "axios";
import BookmarkCard from "../../Shared/BookmarkCard";

const Bookmark = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const getBookmarksData = async () => {
      const { data } = await axios(
        `http://localhost:5000/bookmark/${user?.email}`
      );
      setBookmarks(data);
    };
    getBookmarksData();
  }, [user]);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark._id} bookmark={bookmark}></BookmarkCard>
      ))}
    </div>
  );
};

export default Bookmark;
