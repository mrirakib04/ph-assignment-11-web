import { HeadProvider, Title } from "react-head";
import DashboardStats from "./DashboardStats";
import OrderStatusChart from "./OrderStatusChart";
import { useContext } from "react";
import MainContext from "../../../Context/MainContext";

const DashboardHome = () => {
  const { userName } = useContext(MainContext);

  return (
    <div className="w-full flex flex-col">
      <HeadProvider>
        <Title>Welcome In Dashboard || NextRun Tracker</Title>
      </HeadProvider>
      <div className="w-full py-10 md:py-16 text-center bg-linear-to-r from-cyan-100 via-white to-cyan-100 md:text-3xl sm:text-2xl text-lg font-medium">
        Welcome{" "}
        <span className="font-semibold italic text-sky-700">
          {userName || "User"}
        </span>{" "}
        in NextRun Tracker
      </div>
      <DashboardStats></DashboardStats>
      <OrderStatusChart></OrderStatusChart>
    </div>
  );
};

export default DashboardHome;
