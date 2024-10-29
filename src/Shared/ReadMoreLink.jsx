import React from "react";
import { Link } from "react-router-dom";

const ReadMoreLink = ({ news }) => {
  return (
    <div>
      <Link
        target="_blank"
        to={news?.url}
        className="text-[#005689] font-semibold hover:underline"
      >
        Read More...
      </Link>
    </div>
  );
};

export default ReadMoreLink;
