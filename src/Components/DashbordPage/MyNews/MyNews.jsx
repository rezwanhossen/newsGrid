import React, { useContext } from "react";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import MyNewsCard from "./MyNewsCard";
import { AuthContext } from "../../Fairbase/AuthProvider";

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
    <div className="heebo w-[95%] mx-auto">
      <h1 className="text-xl font-bold my-3">My News</h1>
      <div className="grid grid-cols-4 gap-4 heebo">
        {myNews?.map((news) => (
          <MyNewsCard news={news} refetch={refetch}></MyNewsCard>
        ))}
      </div>
    </div>
  );
};

export default MyNews;
