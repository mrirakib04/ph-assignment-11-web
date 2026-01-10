import { useContext, useState } from "react";
import { MdEmail, MdSend } from "react-icons/md";
import MainContext from "../../../Context/MainContext";
import { toast } from "react-toastify";

const Newsletter = () => {
  const { theme } = useContext(MainContext);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Logic for subscription
      toast.success("Subscribed successfully!");
      setEmail(""); // clear field
    }
  };

  return (
    <section
      className={`w-full py-16 transition-colors duration-500 overflow-hidden ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        <div
          data-aos="fade-up"
          className={`relative sm:p-8 p-5 md:p-12 rounded-3xl overflow-hidden border transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700 shadow-2xl shadow-black/50"
              : "bg-linear-to-r from-sky-500 to-blue-600 border-transparent shadow-xl shadow-blue-500/20"
          }`}
        >
          {/* Corner Accents */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-black/5"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Text Content */}
            <div className="text-center lg:text-left lg:w-1/2">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-black mb-4 ${
                  theme === "dark" ? "text-white" : "text-white"
                }`}
              >
                Join Our{" "}
                <span
                  className={theme === "dark" ? "text-sky-400" : "text-sky-100"}
                >
                  Newsletter
                </span>
              </h2>
              <p
                className={`text-base md:text-lg ${
                  theme === "dark" ? "text-slate-400" : "text-blue-50"
                }`}
              >
                Stay updated with the latest product tracking insights and
                exclusive platform updates delivered to your inbox.
              </p>
            </div>

            {/* Form Content */}
            <div className="w-full lg:w-1/2">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full py-4 pl-12 pr-4 rounded-xl outline-hidden transition-all border-2 ${
                      theme === "dark"
                        ? "bg-slate-900 border-slate-700 text-white focus:border-sky-500"
                        : "bg-white border-transparent text-gray-900 focus:border-white/50"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className={`flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
                    theme === "dark"
                      ? "bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/20"
                      : "bg-slate-900 text-white hover:bg-black shadow-black/20"
                  }`}
                >
                  Subscribe <MdSend />
                </button>
              </form>
              <p
                className={`mt-4 text-xs text-center lg:text-left ${
                  theme === "dark" ? "text-slate-500" : "text-blue-100"
                }`}
              >
                * We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
