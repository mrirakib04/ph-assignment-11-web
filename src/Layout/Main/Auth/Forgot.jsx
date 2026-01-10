import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { HeadProvider, Title } from "react-head";
import auth from "../../../Firebase/firebase.config";
import MainContext from "../../../Context/MainContext";
import { MdLockReset, MdAlternateEmail, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(MainContext);
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!", {
          position: "top-center",
          autoClose: 2000,
        });
        setLoading(false);
        setEmail("");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 2000,
        });
        setLoading(false);
      });
  };

  // Custom Input Styling
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: theme === "dark" ? "white" : "inherit",
      "& fieldset": { borderColor: theme === "dark" ? "#334155" : "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#0ea5e9" },
      borderRadius: "12px",
    },
    "& .MuiInputLabel-root": {
      color: theme === "dark" ? "#94a3b8" : "#64748b",
    },
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-5 py-10 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Forgot Password || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-md w-full" data-aos="fade-up">
        <div
          className={`relative sm:p-8 p-4 md:p-10 rounded-3xl border transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/50"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          {/* Top Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sky-500/10 rounded-2xl text-sky-500 text-4xl">
              <MdLockReset />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
              Reset <span className="text-sky-500">Password</span>
            </h2>
            <p
              className={`text-sm font-bold opacity-60 leading-relaxed ${
                theme === "dark" ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Enter your registered email address below and we'll send you a
              recovery link.
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div className="relative">
              <TextField
                required
                type="email"
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-tighter ${
                loading
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/20"
              }`}
            >
              {loading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
            <button
              onClick={() => navigate("/login")}
              className={`flex items-center justify-center gap-2 mx-auto text-sm font-black uppercase tracking-widest hover:text-sky-500 transition-colors opacity-60 hover:opacity-100`}
            >
              <MdArrowBack className="text-lg" /> Back to Login
            </button>
          </div>

          {/* Decorative Corner */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl"></div>
        </div>

        <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[4px] opacity-30">
          NextRun Identity Protection
        </p>
      </div>
    </section>
  );
};

export default Forgot;
