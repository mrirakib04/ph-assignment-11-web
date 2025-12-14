import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import MainContext from "./MainContext";
import PropTypes from "prop-types";
import auth from "../Firebase/firebase.config";

const MainContextProvider = ({ children }) => {
  const name = "Rakib";
  // Firebase Loader
  const [loading, setLoading] = useState(true);

  // User Informations
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  // Handle Registration With Password
  const handleRegisterEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Handle Login With Password
  const handleLoginEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Handle Google Provider
  const handleGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Handle Logout
  const handleLogout = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        toast.success(`Logout Successful`, {
          position: "top-center",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        toast.error(`Logout Error: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  // User Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserName(currentUser.displayName);
        setUserImage(currentUser.photoURL);
      } else {
        setUser(null);
        setUserName("");
        setUserImage("");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const contextkeys = {
    loading,
    setLoading,
    name,
    handleRegisterEmailPassword,
    handleLoginEmailPassword,
    handleGoogle,
    handleLogout,
    user,
    setUser,
    userName,
    setUserName,
    userImage,
    setUserImage,
  };

  return (
    <MainContext.Provider value={contextkeys}>{children}</MainContext.Provider>
  );
};

MainContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContextProvider;
