import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Components/Loader";
import MainContext from "../../../Context/MainContext";

const OrderStatusChart = () => {
  const { theme } = useContext(MainContext);
  const AxiosPublic = useAxiosPublic();

  const COLORS = ["#f59e0b", "#10b981", "#ef4444", "#64748b"];

  const { data, isLoading } = useQuery({
    queryKey: ["orderStatusCounts"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/dashboard/orders/status-count");
      return res.data;
    },
    retry: 3,
  });

  if (isLoading)
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Loader />
      </div>
    );

  const chartData = [
    { name: "Pending", value: data?.pending || 0 },
    { name: "Approved", value: data?.approved || 0 },
    { name: "Rejected", value: data?.rejected || 0 },
    { name: "Cancelled", value: data?.cancelled || 0 },
  ].filter((item) => item.value > 0);

  return (
    <div className="w-full p-4 sm:p-8">
      <div
        className={`w-full p-3 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 shadow-2xl ${
          theme === "dark"
            ? "bg-slate-900/50 border-slate-800 shadow-black/50"
            : "bg-white border-slate-100 shadow-slate-200/50"
        }`}
      >
        {/* Header */}
        <div className="mb-6">
          <h3
            className={`text-lg font-black tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-800"
            }`}
          >
            Order <span className="text-sky-500">Distribution</span>
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
            Status Overview
          </p>
        </div>

        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                stroke="none"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
                formatter={(value) => (
                  <span
                    className={`text-xs font-bold px-2 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Total Count Indicator */}
        <div className="mt-10 pt-4 border-t border-slate-500/10 text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Total Managed Orders
          </p>
          <p
            className={`text-2xl font-black ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            {chartData.reduce((acc, curr) => acc + curr.value, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusChart;
