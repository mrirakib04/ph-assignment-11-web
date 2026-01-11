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
  MdOutlinePendingActions,
} from "react-icons/md";
import { FiFileText, FiMoon, FiSun } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { useContext } from "react";
import MainContext from "../Context/MainContext";

const Sidebar = ({ role }) => {
  const { theme, toggleTheme } = useContext(MainContext);
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
      to: "/dashboard/approved-orders",
      label: "Approved Orders",
      icon: <MdOutlinePendingActions />,
    },
    {
      to: "/dashboard/pending-orders",
      label: "Pending Orders",
      icon: <MdPendingActions />,
    },
  ];

  const renderLinks = () => {
    if (fixedRole === "admin") return [...commonLinks, ...adminLinks];
    if (fixedRole === "manager") return [...commonLinks, ...managerLinks];
    return commonLinks;
  };

  return (
    <div
      className={`w-full h-full transition-colors flex flex-col justify-between duration-500 sm:p-4 p-1 space-y-2 border-r ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800"
          : "bg-white border-slate-100 shadow-sm"
      }`}
    >
      {/* Brand Section (Optional - Added for Theme consistency) */}
      <div>
        <div className="sm:mb-8 mb-4 lg:px-3 flex items-center gap-2 justify-between">
          <h2
            className={`text-xl font-black hidden lg:block tracking-tighter ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Next<span className="text-sky-500">Run</span>
          </h2>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full border transition-all duration-300 hover:scale-110 ${
              theme === "dark"
                ? "bg-slate-800 border-sky-500 text-yellow-400"
                : "bg-gray-100 border-gray-300 text-sky-600"
            }`}
          >
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
        </div>

        <div className="space-y-1">
          {renderLinks().map((item) => {
            if (item.role && item.role !== fixedRole) return null;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                      : theme === "dark"
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-sky-600"
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
        </div>
      </div>

      <div
        className={`pt-4 border-t ${
          theme === "dark" ? "border-slate-800" : "border-slate-100"
        }`}
      >
        <Link
          to={"/"}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all duration-300 ${
            theme === "dark"
              ? "text-slate-400 hover:bg-rose-500/10 hover:text-rose-400"
              : "text-slate-600 hover:bg-rose-50 hover:text-rose-500"
          }`}
        >
          <FaHome className="text-xl" />
          <span className="lg:flex hidden lg:text-sm xl:text-base">
            Back Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
