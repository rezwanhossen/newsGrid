import React from 'react';
import { Link } from 'react-router-dom';

const ReadMoreLink = ({news}) => {
    return (
        <div>
                         <Link to={news?.url} target='_blank' className="text-red-400 hover:underline  mt-3 font-semibold font-sans">Read More...</Link>
        </div>
    );
};

export default ReadMoreLink;