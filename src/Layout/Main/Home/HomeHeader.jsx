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
  const { user } = useContext(MainContext);
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
    <section className="w-full py-16 md:py-24 bg-linear-to-r from-teal-300 via-white to-cyan-300 text-gray-900 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 flex flex-col lg:flex-row items-center gap-12">
        {/* LEFT */}
        <div className="w-full lg:w-6/12 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="bg-linear-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent font-black italic">
              NextRun Tracker
            </span>{" "}
            <span className="text-gray-900">
              — Smart Order & Production Tracking
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-800 max-w-2xl">
            Track orders, manage production stages, monitor deliveries, and get
            real-time insights — all in one platform.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={handlePrimary}
              className="px-6 cursor-pointer py-3 rounded-lg text-lg font-semibold bg-linear-to-r from-teal-700 to-teal-600 text-white hover:to-cyan-700 shadow-md hover:shadow-lg hover:scale-[1.02] transition"
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </button>

            <button
              onClick={handleSecondary}
              className="px-6 cursor-pointer py-3 rounded-lg text-lg font-semibold bg-white/80 backdrop-blur border border-gray-300 hover:bg-white hover:shadow-lg transition"
            >
              {user ? "Explore Products" : "Create Account"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-700">
            <span>📦 Order Tracking</span>
            <FaRegDotCircle className="opacity-50" />
            <span>🏭 Production Flow</span>
            <FaRegDotCircle className="opacity-50" />
            <span>📊 Real-time Reports</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-6/12 flex justify-center">
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: "Track Orders",
                icon: (
                  <MdOutlineTrackChanges className="text-4xl text-teal-600" />
                ),
              },
              {
                title: "Fast Delivery",
                icon: (
                  <MdOutlineLocalShipping className="text-4xl text-cyan-600" />
                ),
              },
              {
                title: "Insights & Stats",
                icon: (
                  <MdOutlineInsights className="text-4xl text-indigo-600" />
                ),
              },
              {
                title: "Verified Process",
                icon: <MdVerified className="text-4xl text-emerald-600" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition border border-gray-200 flex flex-col items-center text-center"
              >
                {item.icon}
                <h4 className="mt-2 font-semibold text-gray-900 text-base sm:text-lg">
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
