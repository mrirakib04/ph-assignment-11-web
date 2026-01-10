import { useContext } from "react";
import { useNavigate } from "react-router";
import {
  MdOutlineTrackChanges,
  MdOutlineLocalShipping,
  MdOutlineInsights,
  MdVerified,
} from "react-icons/md";
import { FaRegDotCircle } from "react-icons/fa";
import MainContext from "../../../Context/MainContext";

const HomeHeader = () => {
  const { user, theme } = useContext(MainContext);
  const navigate = useNavigate();

  const handlePrimary = () => {
    if (user) navigate("/dashboard");
    else navigate("/login");
  };

  const handleSecondary = () => {
    if (user) navigate("/products");
    else navigate("/register");
  };

  return (
    <section
      className={`w-full py-16 md:py-24 transition-colors duration-500 overflow-hidden ${
        theme === "dark"
          ? "bg-linear-to-br from-slate-950 via-slate-900 to-teal-950 text-white"
          : "bg-linear-to-r from-sky-300 via-white to-green-300 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex flex-col lg:flex-row items-center gap-12">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-6/12 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="bg-linear-to-r from-green-500 via-teal-500 to-sky-500 bg-clip-text text-transparent font-black italic">
              NextRun Tracker
            </span>{" "}
            <span
              className={theme === "dark" ? "text-slate-100" : "text-gray-900"}
            >
              — Smart Order & Production Tracking
            </span>
          </h1>

          <p
            className={`mt-4 text-base sm:text-lg md:text-xl max-w-2xl ${
              theme === "dark" ? "text-slate-400" : "text-gray-800"
            }`}
          >
            Track orders, manage production stages, monitor deliveries, and get
            real-time insights — all in one platform.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={handlePrimary}
              className="px-8 cursor-pointer py-3 rounded-xl text-lg font-bold bg-linear-to-r from-teal-600 to-emerald-600 text-white hover:scale-105 shadow-lg shadow-teal-500/20 transition-all duration-300"
            >
              {user ? "Go to Dashboard" : "Get Started Now"}
            </button>

            <button
              onClick={handleSecondary}
              className={`px-8 cursor-pointer py-3 rounded-xl text-lg font-semibold border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "bg-white/5 border-slate-700 text-white hover:bg-white/10"
                  : "bg-white/80 border-gray-300 text-gray-900 hover:bg-white"
              }`}
            >
              {user ? "Explore Products" : "Create Account"}
            </button>
          </div>

          <div
            className={`mt-6 flex flex-wrap gap-4 justify-center lg:justify-start text-sm font-medium ${
              theme === "dark" ? "text-slate-500" : "text-gray-600"
            }`}
          >
            <span className="flex items-center gap-1">📦 Order Tracking</span>
            <FaRegDotCircle className="opacity-30" />
            <span className="flex items-center gap-1">🏭 Production Flow</span>
            <FaRegDotCircle className="opacity-30" />
            <span className="flex items-center gap-1">
              📊 Real-time Reports
            </span>
          </div>
        </div>

        {/* RIGHT SECTION: FEATURE CARDS */}
        <div className="w-full lg:w-6/12 flex justify-center">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: "Track Orders",
                icon: (
                  <MdOutlineTrackChanges className="text-4xl text-teal-500" />
                ),
                aos: "zoom-in-right",
              },
              {
                title: "Fast Delivery",
                icon: (
                  <MdOutlineLocalShipping className="text-4xl text-cyan-500" />
                ),
                aos: "zoom-in-left",
              },
              {
                title: "Insights & Stats",
                icon: (
                  <MdOutlineInsights className="text-4xl text-indigo-500" />
                ),
                aos: "zoom-in",
              },
              {
                title: "Verified Process",
                icon: <MdVerified className="text-4xl text-emerald-500" />,
                aos: "zoom-in",
              },
            ].map((item, i) => (
              <div
                key={i}
                data-aos={item.aos}
                className={`p-6 rounded-2xl transition-all duration-500 border flex flex-col items-center text-center group hover:-translate-y-2 ${
                  theme === "dark"
                    ? "bg-slate-900/50 border-slate-800 shadow-xl shadow-black/20 hover:border-teal-500/50"
                    : "bg-white border-gray-100 shadow-md hover:shadow-xl"
                }`}
              >
                <div
                  className={`p-3 rounded-full mb-3 ${
                    theme === "dark" ? "bg-slate-800" : "bg-gray-50"
                  }`}
                >
                  {item.icon}
                </div>
                <h4
                  className={`font-bold text-base sm:text-lg ${
                    theme === "dark" ? "text-slate-200" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;
