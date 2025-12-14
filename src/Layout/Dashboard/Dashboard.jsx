import Sidebar from "../../Components/Sidebar";
import { Outlet } from "react-router";
import { useContext } from "react";
import MainContext from "../../Context/MainContext";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Components/Loader";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
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

  const role = userData?.role?.toLowerCase() || "";

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="grid grid-cols-12 h-screen w-full">
      <div className="col-span-2">
        <Sidebar role={role}></Sidebar>
      </div>

      <div className="col-span-10 overflow-y-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
