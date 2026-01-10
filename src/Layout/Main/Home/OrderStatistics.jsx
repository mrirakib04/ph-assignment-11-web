import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { useContext, useEffect } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Components/Loader";
import MainContext from "../../../Context/MainContext";
import AOS from "aos";
import "aos/dist/aos.css";

const OrderStatistics = () => {
  const AxiosPublic = useAxiosPublic();
  const { theme } = useContext(MainContext);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["orderStatistics"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/dashboard/stats");
      return res.data;
    },
    retry: 3,
  });

  const stats = [
    {
      title: "Active Users",
      value: data?.totalUsers || 0,
      icon: <FaUsers />,
      color: "text-blue-500",
      accent: "bg-blue-500/10",
      aosDelay: "0",
    },
    {
      title: "Products Ready",
      value: data?.totalProducts || 0,
      icon: <FaBox />,
      color: "text-emerald-500",
      accent: "bg-emerald-500/10",
      aosDelay: "100",
    },
    {
      title: "Total Orders",
      value: data?.totalOrders || 0,
      icon: <FaShoppingCart />,
      color: "text-sky-500",
      accent: "bg-sky-500/10",
      aosDelay: "200",
    },
    {
      title: "Total Revenue",
      value: `$${data?.totalRevenue || 0}`,
      icon: <FaDollarSign />,
      color: "text-amber-500",
      accent: "bg-amber-500/10",
      aosDelay: "300",
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 overflow-hidden ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Title Area */}
        <div className="text-center mb-8">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Platform <span className="text-sky-500">Live Statistics</span>
          </h2>
          <p
            className={`mt-3 max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Real-time data showing our growth and active operations across the
            platform.
          </p>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={stat.aosDelay}
                className={`relative overflow-hidden p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 border hover:-translate-y-2 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 shadow-xl shadow-black/30"
                    : "bg-gray-50 border-gray-100 shadow-lg shadow-gray-200"
                }`}
              >
                {/* Corner Accent Color */}
                <div
                  className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${stat.accent}`}
                ></div>

                <div
                  className={`text-4xl mb-4 p-4 rounded-full z-10 ${
                    theme === "dark" ? "bg-slate-900" : "bg-white shadow-sm"
                  } ${stat.color}`}
                >
                  {stat.icon}
                </div>

                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-1 z-10 ${
                    theme === "dark" ? "text-slate-500" : "text-gray-500"
                  }`}
                >
                  {stat.title}
                </p>

                <h3
                  className={`text-3xl font-black z-10 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderStatistics;
