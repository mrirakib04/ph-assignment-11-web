import { useContext, useEffect } from "react";
import {
  MdEmail,
  MdAdminPanelSettings,
  MdShoppingCartCheckout,
} from "react-icons/md";
import MainContext from "../../../Context/MainContext";
import AOS from "aos";
import "aos/dist/aos.css";

const PricingPlans = () => {
  const { theme } = useContext(MainContext);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 overflow-hidden ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Title Area - AOS fade-up */}
        <div className="text-center mb-8">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Pricing <span className="text-sky-500">Structure</span>
          </h2>
          <p
            className={`mt-3 max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Transparent pricing for administrators and completely free access
            for our valued buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Buyer Plan - Free */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className={`relative sm:p-8 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 shadow-xl"
                : "bg-gray-50 border-gray-100 shadow-lg"
            }`}
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-emerald-500/10"></div>
            <div className="text-emerald-500 text-5xl mb-4">
              <MdShoppingCartCheckout />
            </div>
            <h3
              className={`text-2xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              For Buyers
            </h3>
            <p
              className={`mb-6 ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
            >
              Access all product listings, track orders, and manage your profile
              without any subscription fee.
            </p>
            <div className="text-4xl font-black text-emerald-500 mb-6">
              FREE
            </div>
            <ul
              className={`space-y-3 mb-8 text-sm ${
                theme === "dark" ? "text-slate-300" : "text-gray-600"
              }`}
            >
              <li>✓ Unlimited Product Browsing</li>
              <li>✓ Real-time Order Tracking</li>
              <li>✓ Personal Dashboard</li>
            </ul>
          </div>

          {/* Admin Plan - Manual Payment */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className={`relative sm:p-8 p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
              theme === "dark"
                ? "bg-slate-800 border-sky-500/30 shadow-sky-900/10"
                : "bg-white border-sky-500/30 shadow-sky-500/10"
            }`}
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-sky-500/10"></div>
            <div className="text-sky-500 text-5xl mb-4">
              <MdAdminPanelSettings />
            </div>
            <h3
              className={`text-2xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              For Admins
            </h3>
            <p
              className={`mb-6 ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
            >
              Manage inventory, approve workflows, and access deep analytics
              through our admin panel.
            </p>
            <div className="text-lg font-bold text-sky-500 mb-6 uppercase tracking-wider">
              Manual Activation
            </div>

            <a
              href="mailto:sales@nextrun.com"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white transition-all bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-500/20"
            >
              <MdEmail className="text-xl" />
              Email sales@nextrun.com
            </a>

            <p
              className={`mt-4 text-[10px] text-center uppercase tracking-tighter ${
                theme === "dark" ? "text-slate-500" : "text-gray-400"
              }`}
            >
              * Only manual payments are accepted for administrative access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
