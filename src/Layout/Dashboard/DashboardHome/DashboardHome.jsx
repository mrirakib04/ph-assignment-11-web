import { HeadProvider, Title } from "react-head";
import DashboardStats from "./DashboardStats";
import OrderStatusChart from "./OrderStatusChart";
import { useContext } from "react";
import MainContext from "../../../Context/MainContext";
import { MdWavingHand } from "react-icons/md";

const DashboardHome = () => {
  const { userName, theme } = useContext(MainContext);

  return (
    <div
      className={`w-full min-h-screen flex flex-col transition-colors duration-500 ${
        theme === "dark" ? "bg-[#020617]" : "bg-slate-50"
      }`}
    >
      <HeadProvider>
        <Title>Welcome In Dashboard || NextRun Tracker</Title>
      </HeadProvider>

      {/* Hero Welcome Section */}
      <div
        className={`relative overflow-hidden w-full py-12 md:py-10 sm:px-6 px-3 text-center transition-all duration-500 ${
          theme === "dark"
            ? "bg-slate-900 border-b border-slate-800"
            : "bg-white border-b border-slate-200"
        }`}
      >
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 flex flex-col items-center gap-3 w-full">
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-500 text-xs font-black uppercase tracking-widest border border-sky-500/20">
            <MdWavingHand className="animate-bounce" />
            System Online
          </div>

          <h1
            className={`sm:text-2xl text-xl md:text-3xl lg:text-5xl font-black tracking-tighter text-wrap leading-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-indigo-500 italic">
              {userName || "User"}
            </span>
          </h1>

          <p className="text-slate-500 md:text-lg sm:text-base text-sm font-medium max-w-2xl mx-auto">
            Experience the next level of logistics management with
            <span className="font-bold text-sky-500 ml-1">NextRun Tracker</span>
            . Everything is under control.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className=" w-full pb-10">
        <DashboardStats />

        <OrderStatusChart />
      </div>
    </div>
  );
};

export default DashboardHome;
