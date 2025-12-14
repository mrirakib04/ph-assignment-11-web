import { Link, NavLink } from "react-router";
import {
  MdDashboard,
  MdAddBox,
  MdInventory,
  MdInventory2,
  MdManageAccounts,
  MdLocalShipping,
  MdPendingActions,
  MdListAlt,
} from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { FaHome } from "react-icons/fa";

const Sidebar = ({ role }) => {
  const fixedRole = role?.toLowerCase() || "";

  const commonLinks = [
    { to: "/dashboard/home", label: "Dashboard", icon: <MdDashboard /> },
    {
      to: "/dashboard/my-orders",
      label: "My Orders",
      icon: <MdListAlt />,
      role: "buyer",
    },
    {
      to: "/dashboard/track-order",
      label: "Track Order",
      icon: <MdLocalShipping />,
      role: "buyer",
    },
  ];

  const adminLinks = [
    {
      to: "/dashboard/add-product",
      label: "Add Product",
      icon: <MdAddBox />,
    },
    {
      to: "/dashboard/all-products",
      label: "All Products",
      icon: <MdInventory2 />,
    },
    {
      to: "/dashboard/all-orders",
      label: "All Orders",
      icon: <FiFileText />,
    },
    {
      to: "/dashboard/manage-users",
      label: "Manage Users",
      icon: <MdManageAccounts />,
    },
  ];

  const managerLinks = [
    {
      to: "/dashboard/add-product",
      label: "Add Product",
      icon: <MdAddBox />,
    },
    {
      to: "/dashboard/manage-products",
      label: "Manage Products",
      icon: <MdInventory />,
    },
    {
      to: "/dashboard/pending-orders",
      label: "Manage Orders",
      icon: <MdPendingActions />,
    },
  ];

  const renderLinks = () => {
    if (fixedRole === "admin") return [...commonLinks, ...adminLinks];
    if (fixedRole === "manager") return [...commonLinks, ...managerLinks];
    return commonLinks;
  };

  return (
    <div className="w-full h-full bg-green-200 sm:p-4 p-1 space-y-2">
      {renderLinks().map((item) => {
        if (item.role && item.role !== fixedRole) return null;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md font-medium ${
                isActive
                  ? "bg-green-500 text-white"
                  : "text-black hover:bg-green-300"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            {/* desktop text */}
            <span className="lg:flex hidden lg:text-sm xl:text-base">
              {item.label}
            </span>
          </NavLink>
        );
      })}
      <Link
        to={"/"}
        className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-black hover:bg-orange-300"
      >
        <FaHome className="text-xl" />
        <span className="lg:flex hidden lg:text-sm xl:text-base">
          Back Home
        </span>
      </Link>
    </div>
  );
};

export default Sidebar;
