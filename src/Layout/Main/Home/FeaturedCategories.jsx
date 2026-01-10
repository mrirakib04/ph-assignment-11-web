import { useContext } from "react";
import {
  MdOutlineEngineering,
  MdOutlineInventory2,
  MdOutlineLocalShipping,
  MdOutlineAnalytics,
} from "react-icons/md";
import MainContext from "../../../Context/MainContext";

const FeaturedCategories = () => {
  const { theme } = useContext(MainContext);

  const categories = [
    {
      name: "Manufacturing",
      count: "120+ Products",
      icon: <MdOutlineEngineering />,
      color: "text-emerald-500",
      accent: "bg-emerald-500/10",
    },
    {
      name: "Raw Materials",
      count: "85+ Products",
      icon: <MdOutlineInventory2 />,
      color: "text-blue-500",
      accent: "bg-blue-500/10",
    },
    {
      name: "Logistics",
      count: "50+ Services",
      icon: <MdOutlineLocalShipping />,
      color: "text-sky-500",
      accent: "bg-sky-500/10",
    },
    {
      name: "Data Analytics",
      count: "15+ Reports",
      icon: <MdOutlineAnalytics />,
      color: "text-purple-500",
      accent: "bg-purple-500/10",
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 overflow-hidden ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Title Area - AOS fade-up & No width bar */}
        <div className="text-center mb-8">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Explore <span className="text-sky-500">Categories</span>
          </h2>
          <p
            className={`mt-3 max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Discover our diverse range of production and tracking categories
            designed to optimize your workflow.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`relative group p-8 rounded-2xl overflow-hidden flex flex-col items-center text-center transition-all duration-300 border cursor-pointer hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 shadow-xl shadow-black/30"
                  : "bg-gray-50 border-gray-100 shadow-lg shadow-gray-200"
              }`}
            >
              {/* Corner Accent Color */}
              <div
                className={`absolute -top-6 -right-6 w-20 h-20 rounded-full transition-transform duration-500 group-hover:scale-125 ${cat.accent}`}
              ></div>

              {/* Icon Container */}
              <div
                className={`text-5xl mb-4 p-5 rounded-full z-10 transition-transform duration-500 group-hover:scale-110 ${
                  theme === "dark" ? "bg-slate-900" : "bg-white shadow-sm"
                } ${cat.color}`}
              >
                {cat.icon}
              </div>

              <h3
                className={`text-xl font-bold mb-1 z-10 transition-colors duration-300 ${
                  theme === "dark" ? "text-slate-100" : "text-gray-900"
                } group-hover:text-sky-500`}
              >
                {cat.name}
              </h3>

              <p
                className={`text-sm font-medium z-10 ${
                  theme === "dark" ? "text-slate-500" : "text-gray-500"
                }`}
              >
                {cat.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
