import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import useAxiosCommon from "../../Hook/useAxiosCommon";
import app from "./firbase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googlepro = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosCommon = useAxiosCommon();

  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(true);

  //user create
  const creatuser = (email, password) => {
    setLoding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //updat profil
  const updatprofil = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  //login user
  const login = (email, password) => {
    setLoding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google login
  const googlelogin = () => {
    setLoding(true);
    return signInWithPopup(auth, googlepro);
  };

  // logout
  const logout = async () => {
    setUser(null);
    return signOut(auth);
  };
  //save user

  const saveUser = async (user) => {
    const cuser = {
      name: user?.displayName,
      email: user?.email,
    };
    const { data } = await axios.post(`http://localhost:5000/users`, cuser);
    return data;
  };
  useEffect(() => {
    const unsubscrib = onAuthStateChanged(auth, (curentuser) => {
      setUser(curentuser);
      //saveUser(curentuser);

      if (curentuser) {
        const userinfo = { email: curentuser.email };
        axiosCommon.post("/jwt", userinfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoding(false);
          }
        });

        saveUser(curentuser);
      } else {
        localStorage.removeItem("access-token");
        setLoding(false);
      }
    });
    return () => {
      return unsubscrib;
    };
  }, []);

  const authinfo = {
    user,
    loding,
    creatuser,
    updatprofil,
    login,
    googlelogin,
    logout,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
