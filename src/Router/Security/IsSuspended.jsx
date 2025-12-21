import { useContext } from "react";
import MainContext from "../../Context/MainContext";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const IsSuspended = ({ children }) => {
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

  if (userData.status == "suspended") {
    toast.error("You are suspended! Contact Admin.", {
      position: "top-center",
      autoClose: 2000,
    });
    return <Navigate to="/dashboard/home" replace />;
  }

  return children;
};

IsSuspended.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsSuspended;
