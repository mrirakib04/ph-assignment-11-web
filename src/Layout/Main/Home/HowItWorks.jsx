import { useContext, useEffect } from "react";
import {
  MdLogin,
  MdSearch,
  MdShoppingCart,
  MdTrackChanges,
} from "react-icons/md";
import MainContext from "../../../Context/MainContext";
import AOS from "aos";
import "aos/dist/aos.css";

const HowItWorks = () => {
  const { theme } = useContext(MainContext);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const steps = [
    {
      title: "Create Account",
      desc: "Join our platform by signing up with your basic details securely.",
      icon: <MdLogin />,
      color: "text-blue-500",
      accent: "bg-blue-500/10",
    },
    {
      title: "Browse Products",
      desc: "Explore our wide range of products and select what fits your needs.",
      icon: <MdSearch />,
      color: "text-purple-500",
      accent: "bg-purple-500/10",
    },
    {
      title: "Place Order",
      desc: "Order with ease using our transparent and secure payment gateway.",
      icon: <MdShoppingCart />,
      color: "text-emerald-500",
      accent: "bg-emerald-500/10",
    },
    {
      title: "Live Tracking",
      desc: "Monitor your production and delivery stages in real-time accurately.",
      icon: <MdTrackChanges />,
      color: "text-sky-500",
      accent: "bg-sky-500/10",
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 overflow-hidden ${
        theme === "dark" ? "bg-slate-950" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Title Area - mb-8 spacing */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            How It <span className="text-sky-500">Works</span>
          </h2>
          <p
            className={`mt-3 max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Follow these four simple steps to get started with NextRun Tracker
            and manage your orders effectively.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              className={`relative p-8 rounded-2xl flex flex-col items-center overflow-hidden text-center transition-all duration-300 border group hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 shadow-xl shadow-black/40"
                  : "bg-white border-gray-100 shadow-lg shadow-gray-200"
              }`}
            >
              {/* Corner Accent */}
              <div
                className={`absolute -top-6 -right-6 w-20 h-20 rounded-full transition-transform duration-500 group-hover:scale-110 ${step.accent}`}
              ></div>

              {/* Step Number Tag */}
              <div className="absolute top-4 left-4 font-black text-4xl opacity-10 select-none">
                0{index + 1}
              </div>

              <div
                className={`text-4xl mb-6 p-5 rounded-2xl z-10 transition-colors duration-300 ${
                  theme === "dark" ? "bg-slate-800" : "bg-gray-50"
                } ${step.color}`}
              >
                {step.icon}
              </div>

              <h3
                className={`text-xl font-bold mb-3 z-10 ${
                  theme === "dark" ? "text-slate-100" : "text-gray-900"
                }`}
              >
                {step.title}
              </h3>

              <p
                className={`text-sm leading-relaxed z-10 ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
