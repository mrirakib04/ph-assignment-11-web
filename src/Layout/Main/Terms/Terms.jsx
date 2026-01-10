import { useContext } from "react";
import MainContext from "../../../Context/MainContext";
import {
  MdGavel,
  MdOutlineFactCheck,
  MdBlock,
  MdInfoOutline,
} from "react-icons/md";

const Terms = () => {
  const { theme } = useContext(MainContext);

  const termSections = [
    {
      title: "User Agreement",
      desc: "By accessing NextRun Tracker, you agree to comply with our operating procedures and all applicable local and international laws.",
      icon: <MdOutlineFactCheck />,
    },
    {
      title: "Account Responsibility",
      desc: "Administrators and users are responsible for maintaining the security of their credentials. Any misuse under your account is your sole responsibility.",
      icon: <MdInfoOutline />,
    },
    {
      title: "Prohibited Conduct",
      desc: "Users are strictly prohibited from attempting to bypass security, scrap data, or use the platform for any fraudulent production activities.",
      icon: <MdBlock />,
    },
    {
      title: "Termination of Service",
      desc: "We reserve the right to suspend or terminate access to the platform for any user who violates these terms or engages in unethical business practices.",
      icon: <MdGavel />,
    },
  ];

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 overflow-hidden ${
        theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            Terms & <span className="text-sky-500">Conditions</span>
          </h1>
          <p
            className={`max-w-3xl mx-auto text-lg ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Please read these terms carefully before using our SaaS platform.
            They govern your relationship with NextRun Tracker and define your
            legal rights.
          </p>
        </div>

        {/* Quick Terms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {termSections.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`sm:p-6 p-4 rounded-2xl border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 hover:border-sky-500/30"
                  : "bg-gray-50 border-gray-100 hover:border-sky-500/30 shadow-sm"
              }`}
            >
              <div className="text-3xl text-sky-500 mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p
                className={`text-sm leading-relaxed ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Legal Content */}
        <div
          data-aos="fade-up"
          className={`relative p-4 sm:p-8 md:p-12 rounded-3xl border ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          {/* Corner Accent Decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/5 rounded-full blur-3xl"></div>

          <article
            className={`space-y-8 text-sm md:text-base leading-relaxed ${
              theme === "dark" ? "text-slate-300" : "text-gray-700"
            }`}
          >
            <section>
              <h2 className="text-xl font-bold text-sky-500 mb-3">
                1. Service Eligibility
              </h2>
              <p>
                Our platform is intended for business entities and professional
                individuals. By creating an account, you represent that you have
                the legal capacity to enter into a binding agreement and are at
                least 18 years of age.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-sky-500 mb-3">
                2. Intellectual Property
              </h2>
              <p>
                The software, algorithms, UI designs, and tracking methodology
                used in NextRun Tracker are the exclusive property of NextRun.
                You may not copy, reverse-engineer, or distribute any part of
                our platform without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-sky-500 mb-3">
                3. Limitation of Liability
              </h2>
              <p>
                While we strive for 99.9% accuracy, NextRun Tracker is not
                liable for any indirect or consequential losses resulting from
                data entry errors, production delays, or third-party delivery
                service failures.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-sky-500 mb-3">
                4. Manual Payments
              </h2>
              <p>
                Administrative access is granted only after verification of
                manual payments sent to our sales department. All sales for
                admin licenses are final and non-refundable once the service is
                activated.
              </p>
            </section>
          </article>

          <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs font-mono uppercase tracking-widest opacity-60">
              Reference: NR-TERMS-2026-V1
            </p>
            <p className="text-sm font-bold text-sky-500">
              Last Updated: January 10, 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
