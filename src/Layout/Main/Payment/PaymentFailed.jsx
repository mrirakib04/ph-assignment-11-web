import { HeadProvider, Title } from "react-head";
import { useNavigate } from "react-router";
import { useContext } from "react";
import MainContext from "../../../Context/MainContext";
import {
  MdErrorOutline,
  MdRefresh,
  MdHome,
  MdSupportAgent,
} from "react-icons/md";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const { theme } = useContext(MainContext);

  return (
    <section
      className={`min-h-[80vh] flex items-center justify-center py-20 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Payment Failed || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-2xl w-full px-5" data-aos="fade-up">
        <div
          className={`relative overflow-hidden p-4 sm:p-8 md:p-12 rounded-3xl border text-center transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl"
              : "bg-white border-gray-100 shadow-xl shadow-gray-200"
          }`}
        >
          {/* Top Decorative Accent */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>

          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 animate-pulse"></div>
              <MdErrorOutline className="lg:text-8xl md:text-7xl text-6xl text-rose-500 relative z-10" />
            </div>
          </div>

          <h1 className="sm:text-3xl text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">
            Payment <span className="text-rose-500">Failed!</span>
          </h1>

          <p
            className={`sm:text-lg text-sm mb-8 max-w-md mx-auto leading-relaxed ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            We couldn't process your transaction. This might be due to
            insufficient funds, an expired card, or a temporary network issue.
          </p>

          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 border ${
              theme === "dark"
                ? "bg-slate-950 border-slate-800"
                : "bg-rose-50 border-rose-100"
            }`}
          >
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-widest text-rose-500">
              Status: Unpaid
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)} // Go back to payment page to retry
              className="flex-1 py-4 px-6 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-2xl shadow-lg shadow-rose-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
            >
              <MdRefresh className="text-xl" /> Try Again
            </button>

            <button
              onClick={() => navigate("/")}
              className={`flex-1 py-4 px-6 font-black rounded-2xl border transition-all active:scale-95 flex items-center justify-center gap-2 uppercase text-sm tracking-wider ${
                theme === "dark"
                  ? "border-slate-700 hover:bg-slate-800 text-white"
                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
              }`}
            >
              <MdHome className="text-xl" /> Back to Home
            </button>
          </div>

          {/* Support Link */}
          <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col items-center gap-2">
            <p className="text-xs font-bold opacity-50 uppercase tracking-tight">
              Having persistent issues?
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center gap-1 text-sky-500 font-black text-xs uppercase hover:underline"
            >
              <MdSupportAgent className="text-lg" /> Contact Support Team
            </button>
          </div>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[4px] opacity-30">
            NextRun Security System
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentFailed;
