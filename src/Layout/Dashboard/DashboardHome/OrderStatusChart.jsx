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

const COLORS = ["#fbbf24", "#16a34a", "#dc2626", "#6b7280"];

const OrderStatusChart = () => {
  const AxiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["orderStatusCounts"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/dashboard/orders/status-count");
      return res.data;
    },
    retry: 3,
  });

  if (isLoading) return <Loader />;

  const chartData = [
    { name: "Pending", value: data.pending || 0 },
    { name: "Approved", value: data.approved || 0 },
    { name: "Rejected", value: data.rejected || 0 },
    { name: "Cancelled", value: data.cancelled || 0 },
  ];

  return (
    <div className="w-full py-10 px-2">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatusChart;
