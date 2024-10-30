import React, { useContext } from "react";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import MyNewsCard from "./MyNewsCard";
import { AuthContext } from "../../Fairbase/AuthProvider";
import { Link } from "react-router-dom";

const MyNews = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: myNews = [], refetch } = useQuery({
    queryKey: ["myNews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myNews/${user?.email}`);
      console.log(res?.data);
      return res.data;
    },
  });
  return (
    <div className="heebo h-screen w-[95%] mx-auto">
      <h1 className="text-xl lg:text-2xl font-bold my-3">My News</h1>
          {
            myNews?.length > 0 ? <div className="grid grid-cols-4 gap-4 heebo">
            {myNews?.map((news) => (
              <MyNewsCard news={news} refetch={refetch}></MyNewsCard>
            ))}
          </div>:
          <div className="px-8 py-3 heebo flex justify-center text-center my-10  w-full">
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Sorry ! No news added
            </h1>

            <div className="max-w-sm mx-auto rounded-xl mt-6">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgwfdPYGzbsKc3NPMtKVF-Jd7JLkVQU_OuGJIvPCqtH-G-Hw1joSiRdVBZKv9rMcfCFWiENy02Ba85I_CbKZjJDqcLBqE5OZRKyk78aN40Qq0qGiHREjpKGgcnxUilh3lZVi9i6cVxEWpz0/s1600/giphy.gif"
                alt="nai"
              />
            </div>

            <div>
                <h1 className="text-xl mt-2">Please <Link className="text-blue-600 underline font-bold ml-2" to="/dashbord/addnews">Add News</Link></h1>
            </div>
          </div>
        </div>
          }
    </div>
  );
};

export default MyNews;
