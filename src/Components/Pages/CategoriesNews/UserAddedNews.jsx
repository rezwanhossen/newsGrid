/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Card from '../../../Shared/Card';

const UserAddedNews = ({categoryNews}) => {
    // console.log("categoryyyyyy : " , categoryNews);
    

    
    // console.log("category" , categoryNews)
    return (
        <div className="my-10 mx-5 md:mx-0">
                <div className="heebo">
                    <h1 className="text-3xl font-bold mt-10 mb-6  border-l-[#005689] border-l-8 pl-3">{categoryNews?.length > 0 && 'News Added by User'}</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {categoryNews?.map(news => news?.status === 'approved' &&<Card news={news}></Card>)}
                </div>
        </div>
    );
};

export default UserAddedNews;