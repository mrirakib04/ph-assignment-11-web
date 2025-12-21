import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import MainContext from "../../Context/MainContext";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Navigate } from "react-router";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const IsAdminManager = ({ children }) => {
  const { user } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    retry: 3,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (userData.role === "Manager" || userData.role === "Admin") {
    return children;
  }

  toast.warn("You are unauthorized for this page!", {
    position: "top-center",
    autoClose: 2000,
  });
  return <Navigate to="/dashboard/home" replace />;
};

IsAdminManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsAdminManager;
