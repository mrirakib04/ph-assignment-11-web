import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MdPeopleOutline,
  MdOutlineInventory2,
  MdOutlineShoppingCart,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Components/Loader";
import MainContext from "../../../Context/MainContext";

const DashboardStats = () => {
  const { theme } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/dashboard/stats");
      return res.data;
    },
    retry: 3,
  });

  if (isLoading)
    return (
      <div className="p-10">
        <Loader />
      </div>
    );

  const stats = [
    {
      title: "Total Users",
      value: data?.totalUsers || 0,
      icon: <MdPeopleOutline size={32} />,
      color: "from-blue-500 to-indigo-600",
      lightBg: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
    {
      title: "Total Products",
      value: data?.totalProducts || 0,
      icon: <MdOutlineInventory2 size={32} />,
      color: "from-emerald-500 to-teal-600",
      lightBg: "bg-emerald-500/10",
      textColor: "text-emerald-500",
    },
    {
      title: "Total Orders",
      value: data?.totalOrders || 0,
      icon: <MdOutlineShoppingCart size={32} />,
      color: "from-amber-500 to-orange-600",
      lightBg: "bg-amber-500/10",
      textColor: "text-amber-500",
    },
    {
      title: "Total Revenue",
      value: `$${data?.totalRevenue?.toLocaleString() || 0}`,
      icon: <MdOutlineAccountBalanceWallet size={32} />,
      color: "from-rose-500 to-pink-600",
      lightBg: "bg-rose-500/10",
      textColor: "text-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 md:p-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`relative group overflow-hidden p-6 rounded-4xl border transition-all duration-500 hover:scale-[1.02] ${
            theme === "dark"
              ? "bg-slate-900/50 border-slate-800 shadow-2xl shadow-black/20"
              : "bg-white border-slate-100 shadow-xl shadow-slate-200/50"
          }`}
        >
          {/* Background Decorative Circle */}
          <div
            className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 transition-transform duration-700 group-hover:scale-150 bg-linear-to-br ${stat.color}`}
          />

          <div className="flex items-center gap-5 relative z-10">
            {/* Icon Container */}
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 ${
                theme === "dark" ? "bg-slate-800" : stat.lightBg
              } ${stat.textColor}`}
            >
              {stat.icon}
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <span
                className={`text-[10px] uppercase font-black tracking-widest opacity-60 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {stat.title}
              </span>
              <h2
                className={`text-2xl font-black mt-0.5 tracking-tight ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                {stat.value}
              </h2>
            </div>
          </div>

          {/* Bottom Progress/Indicator Line */}
          <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-linear-to-r ${stat.color} transition-all duration-1000`}
              style={{ width: "70%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
