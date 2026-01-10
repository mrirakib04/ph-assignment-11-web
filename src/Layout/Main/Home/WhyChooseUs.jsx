import { useContext } from "react";
import { MdSecurity, MdTimeline, MdInsights, MdVerified } from "react-icons/md";
import MainContext from "../../../Context/MainContext";

const WhyChooseUs = () => {
  const { theme } = useContext(MainContext);

  const features = [
    {
      title: "Secure Payments",
      subtitle:
        "All transactions are encrypted and safely stored for finance tracking.",
      icon: (
        <MdSecurity
          className={`text-4xl ${
            theme === "dark" ? "text-sky-400" : "text-blue-700"
          }`}
        />
      ),
      borderColor:
        theme === "dark"
          ? "border-slate-700 hover:border-sky-500"
          : "border-blue-500",
      shadow: theme === "dark" ? "shadow-black/40" : "shadow-blue-400/30",
    },
    {
      title: "Real-time Tracking",
      subtitle:
        "Track every order stage from placement to delivery in real time.",
      icon: (
        <MdTimeline
          className={`text-4xl ${
            theme === "dark" ? "text-sky-400" : "text-blue-700"
          }`}
        />
      ),
      borderColor:
        theme === "dark"
          ? "border-slate-700 hover:border-sky-500"
          : "border-blue-500",
      shadow: theme === "dark" ? "shadow-black/40" : "shadow-blue-400/30",
    },
    {
      title: "Smart Insights",
      subtitle:
        "Get clear data insights for better decisions and faster execution.",
      icon: (
        <MdInsights
          className={`text-4xl ${
            theme === "dark" ? "text-sky-400" : "text-blue-700"
          }`}
        />
      ),
      borderColor:
        theme === "dark"
          ? "border-slate-700 hover:border-sky-500"
          : "border-blue-500",
      shadow: theme === "dark" ? "shadow-black/40" : "shadow-blue-400/30",
    },
    {
      title: "Verified Workflow",
      subtitle:
        "Manager approval system ensures every order follows proper workflow.",
      icon: (
        <MdVerified
          className={`text-4xl ${
            theme === "dark" ? "text-sky-400" : "text-blue-700"
          }`}
        />
      ),
      borderColor:
        theme === "dark"
          ? "border-slate-700 hover:border-sky-500"
          : "border-blue-500",
      shadow: theme === "dark" ? "shadow-black/40" : "shadow-blue-400/30",
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-linear-to-br from-teal-50 via-white to-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2
            className={`md:text-4xl sm:text-3xl text-2xl font-black ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Why Choose <span className="text-sky-500">NextRun Tracker</span>
          </h2>
          <p
            className={`mt-4 max-w-2xl mx-auto text-lg ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            A modern order and production tracking platform built for speed,
            transparency, and control.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              data-aos="zoom-in"
              key={index}
              className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 shadow-xl ${
                item.borderColor
              } ${item.shadow} ${
                theme === "dark" ? "bg-slate-900/50" : "bg-white"
              }`}
            >
              <div
                className={`mb-6 p-3 w-fit rounded-xl ${
                  theme === "dark" ? "bg-slate-800" : "bg-blue-50"
                }`}
              >
                {item.icon}
              </div>

              <h4
                className={`text-xl font-bold mb-3 ${
                  theme === "dark" ? "text-slate-100" : "text-gray-900"
                }`}
              >
                {item.title}
              </h4>

              <p
                className={`leading-relaxed text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
