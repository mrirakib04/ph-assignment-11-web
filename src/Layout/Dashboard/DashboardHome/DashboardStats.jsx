import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Components/Loader";

const DashboardStats = () => {
  const AxiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/dashboard/stats");
      return res.data;
    },
    retry: 3,
  });

  if (isLoading) return <Loader />;

  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: <FaUsers size={28} />,
    },
    {
      title: "Total Products",
      value: data.totalProducts,
      icon: <FaBox size={28} />,
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: <FaShoppingCart size={28} />,
    },
    {
      title: "Total Revenue",
      value: `$ ${data.totalRevenue}`,
      icon: <FaDollarSign size={28} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-5 py-10">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="flex flex-col text-center items-center gap-4 bg-white p-5 rounded-lg shadow-md"
        >
          <div className="text-teal-600">{stat.icon}</div>
          <div>
            <p className="text-gray-500 font-semibold">{stat.title}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
