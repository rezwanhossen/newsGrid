import useAuth from "./useAuth/useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user, loding } = useAuth();
  const axiosSec = useAxiosSecure();
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loding,
    queryFn: async () => {
      const res = await axiosSec.get(`/user/admin/${user.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isLoading];
};

export default useAdmin;
