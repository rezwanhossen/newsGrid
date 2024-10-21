import React from 'react';

import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Card from '../../../Shared/Card';
import Loading from '../../Loading/Loading';

const UsersNews = () => {
    const axiosPublic = useAxiosPublic();
    const {data : myNews = [] , isLoading} = useQuery({
        queryKey : ['usersNews'],
        queryFn : async() => {
                const news = await axiosPublic.get('/myNews')
                console.log(news?.data);
                return news?.data
        }
    });

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className="bg-base-200">
            <div className="bg-white heebo">
                <h1 className="text-2xl font-semibold text-center py-4">Home / Users News  </h1>
            </div>
            <div className='mt-16 container mx-auto flex gap-8 pb-16'>
                    <div className="bg-white w-[400px] h-[300px] rounded-lg p-5">
                        <h1 className="text-xl font-semibold">News By Categories</h1>

                    </div>
                    <div className="border-4 w-full">
                        <div></div>
                        <div className='grid grid-cols-2 gap-8'>
                            {
                                myNews?.map(news => news?.status === 'approved' && <Card news={news}></Card>)
                            }
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default UsersNews;