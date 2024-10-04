import React from 'react';
import { Link } from 'react-router-dom';

const ReadMoreLink = ({news}) => {
    return (
        <div>
                         <Link to={news?.url} className='text-[#005689] font-semibold hover:underline'>Read More...</Link>
        </div>
    );
};

export default ReadMoreLink;