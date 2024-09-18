import { useContext } from "react";
// import { AuthContext } from "../../AuthProvider/AuthProvider";
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";

const useAuth = () => {
  const allvalue = useContext(AuthContext);
  return allvalue;
};

export default useAuth;
