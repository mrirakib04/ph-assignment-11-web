import { useContext } from "react";
import MainContext from "../../../Context/MainContext";
import {
  MdSecurity,
  MdLockOutline,
  MdVisibility,
  MdUpdate,
} from "react-icons/md";

const Policy = () => {
  const { theme } = useContext(MainContext);

  const policies = [
    {
      title: "Data Collection",
      desc: "We collect essential information such as name, email, and business details to provide a seamless SaaS experience and order tracking.",
      icon: <MdVisibility />,
    },
    {
      title: "Data Usage",
      desc: "Your data is strictly used for account management, production tracking, and improving our platform services. We do not sell your data.",
      icon: <MdSecurity />,
    },
    {
      title: "Security Standards",
      desc: "We implement industry-standard encryption and secure protocols to protect your sensitive business information from unauthorized access.",
      icon: <MdLockOutline />,
    },
    {
      title: "Policy Updates",
      desc: "We may update this policy periodically to reflect changes in our services. Continued use of the platform implies acceptance of updates.",
      icon: <MdUpdate />,
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 ${
        theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            Privacy <span className="text-sky-500">Policy</span>
          </h1>
          <p
            className={`max-w-3xl mx-auto text-lg ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            At NextRun Tracker, we prioritize your data security and
            transparency. Learn how we handle and protect your information
            within our ecosystem.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {policies.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`sm:p-8 p-4 rounded-3xl border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 hover:border-sky-500/50"
                  : "bg-gray-50 border-gray-100 hover:border-sky-500/50 shadow-sm"
              }`}
            >
              <div className="text-4xl text-sky-500 mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p
                className={`leading-relaxed ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Section */}
        <div
          data-aos="zoom-in"
          className={`sm:p-8 p-4 md:p-12 rounded-3xl border-2 border-dashed ${
            theme === "dark"
              ? "border-slate-800 bg-slate-900/30"
              : "border-sky-100 bg-sky-50/30"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-sky-500 rounded-full"></span>
            Terms of Information
          </h2>
          <div
            className={`space-y-6 text-sm md:text-base leading-relaxed ${
              theme === "dark" ? "text-slate-400" : "text-gray-700"
            }`}
          >
            <p>
              Our platform uses cookies and similar technologies to enhance user
              experience and analyze site traffic. By using NextRun Tracker, you
              consent to our use of these technologies.
            </p>
            <p>
              Users are responsible for maintaining the confidentiality of their
              account credentials. Any unauthorized activity should be reported
              immediately to <strong>support@nextrun.com</strong>.
            </p>
            <p>
              We ensure compliance with global data protection regulations to
              give you peace of mind while managing your production workflows.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-sky-500">
              Last Updated: January 2026
            </p>
            <button className="text-sm font-bold text-sky-500 hover:underline">
              Download PDF Version
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policy;
