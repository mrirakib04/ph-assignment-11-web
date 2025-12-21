import { useContext } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
import PropTypes from "prop-types";
import MainContext from "../../Context/MainContext";
import Loader from "../../Components/Loader";

const IsLogin = ({ children }) => {
  const { user, loading } = useContext(MainContext);

  if (loading) {
    return <Loader></Loader>;
  }

  if (!user) {
    toast.info("Please login first!", {
      position: "top-center",
      autoClose: 2000,
    });
    return <Navigate to="/login" replace />;
  }

  return children;
};

IsLogin.propTypes = {
  children: PropTypes.node.isRequired,
};
export default IsLogin;
