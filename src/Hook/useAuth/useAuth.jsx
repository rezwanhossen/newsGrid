import { useContext } from "react";
import { AuthContext } from "../../Components/Fairbase/AuthProvider";

const useAuth = () => {
  const allvalue = useContext(AuthContext);
  return allvalue;
};

export default useAuth;
