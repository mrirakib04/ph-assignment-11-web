import { useContext } from "react";
import { HeadProvider, Title } from "react-head";
import MainContext from "../../../Context/MainContext";
import {
  MdCheckCircle,
  MdBusinessCenter,
  MdGroups,
  MdOutlineAdsClick,
} from "react-icons/md";

const About = () => {
  const { theme } = useContext(MainContext);

  const features = [
    "Multi-role system with Admin, Manager, and User access control.",
    "Product management with category, pricing, and visibility controls.",
    "Advanced filtering, searching, and price-based sorting.",
    "Centralized dashboard to monitor platform activity.",
    "Scalable SaaS architecture for growing businesses.",
  ];

  const benefits = [
    {
      title: "Rapid Deployment",
      icon: <MdOutlineAdsClick />,
      desc: "Faster store setup without building from scratch.",
    },
    {
      title: "Cost Efficiency",
      icon: <MdBusinessCenter />,
      desc: "Reduced operational cost through automation.",
    },
    {
      title: "Full Control",
      icon: <MdGroups />,
      desc: "Better control over product visibility and sales.",
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 ${
        theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>About Us | NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-7xl mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl font-black mb-6">
            About Our <span className="text-sky-500">Platform</span>
          </h1>
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            NextRun Tracker is an enterprise-grade SaaS solution engineered to
            empower businesses to manage, sell, and scale their infrastructure
            with precision from a single, centralized command center.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Features List */}
          <div data-aos="fade-right" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Core Ecosystem Features
            </h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <MdCheckCircle className="text-sky-500 text-xl mt-1 shrink-0" />
                  <p
                    className={`${
                      theme === "dark" ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Decorative Image/Visual Block */}
          <div data-aos="zoom-in" className="relative p-10">
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div
              className={`relative z-10 p-8 rounded-3xl border-2 border-dashed ${
                theme === "dark"
                  ? "border-slate-800 bg-slate-900/50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <h3 className="text-xl font-bold mb-4 italic text-sky-500 text-center">
                Modern Infrastructure
              </h3>
              <p
                className={`text-sm text-center leading-relaxed ${
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }`}
              >
                Built with modern web technologies to ensure unmatched
                performance, security, and future extensibility. The ideal
                foundation for startups and growing brands.
              </p>
            </div>
          </div>
        </div>

        {/* Business Benefits - Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`relative overflow-hidden p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 shadow-xl"
                  : "bg-white border-gray-100 shadow-lg shadow-gray-200"
              }`}
            >
              {/* Corner Accent */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-sky-500/10 rounded-full"></div>

              <div className="text-4xl text-sky-500 mb-4">{item.icon}</div>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
