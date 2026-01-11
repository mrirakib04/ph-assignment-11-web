import { Link, useNavigate } from "react-router";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext, useRef } from "react";
import MainContext from "../../../Context/MainContext";
import { FcGoogle } from "react-icons/fc";
import { HeadProvider, Title } from "react-head";
import {
  MdEmail,
  MdLock,
  MdLogin,
  MdBadge,
  MdSupervisorAccount,
  MdPerson,
} from "react-icons/md";

const Login = () => {
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const formRef = useRef(null);

  const {
    setUser,
    setUserImage,
    setUserName,
    handleLoginEmailPassword,
    handleGoogle,
    theme,
  } = useContext(MainContext);

  // all users to prevent duplicate
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;

    handleLoginEmailPassword(email, password)
      .then((result) => {
        const newUser = result.user;
        setUser(newUser);
        setUserName(newUser.displayName);
        setUserImage(newUser.photoURL || "");
        toast.success("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Login Error: ${error.message}`);
      });
  };

  const handleGoogleMethod = () => {
    handleGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        setUserName(user.displayName);
        setUserImage(user.photoURL);
        toast.success("Google Login Successful");

        const exists = users.find((u) => u.email === user.email);
        if (!exists) {
          const newUser = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            role: "Buyer",
            status: "pending",
          };
          AxiosPublic.post("/users", newUser);
        }
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Google Login Error: ${error.message}`);
      });
  };

  // Quick fill function
  const fillCredentials = (email) => {
    const form = formRef.current;
    form.email.value = email;
    form.password.value = "ABC@123abc";
  };

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
    mb: 2,
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
        <Title>Login || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-md w-full" data-aos="zoom-in">
        <div
          className={`sm:p-8 p-4 md:p-10 rounded-3xl border transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-sky-500/10 rounded-2xl text-sky-500 text-3xl mb-4">
              <MdLogin />
            </div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Welcome <span className="text-sky-500">Back</span>
            </h1>
            <p className="text-sm font-bold opacity-60 mt-1">
              Sign in to continue to your dashboard
            </p>
          </div>

          <form ref={formRef} onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              required
              sx={inputStyle}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              required
              sx={inputStyle}
            />

            <div className="text-right mb-4">
              <Link
                to="/forgot"
                className="text-xs font-bold text-sky-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white font-black text-lg rounded-xl shadow-lg shadow-sky-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-tighter"
            >
              Sign In <MdLogin className="text-xl" />
            </button>
          </form>

          <div className="flex items-center my-6">
            <Divider
              className="flex-1"
              sx={{ borderColor: theme === "dark" ? "#1e293b" : "#e2e8f0" }}
            />
            <span className="px-4 text-xs font-black uppercase opacity-40">
              Or Continue With
            </span>
            <Divider
              className="flex-1"
              sx={{ borderColor: theme === "dark" ? "#1e293b" : "#e2e8f0" }}
            />
          </div>

          <button
            onClick={handleGoogleMethod}
            className={`w-full py-3 border-2 rounded-xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 uppercase text-sm tracking-widest ${
              theme === "dark"
                ? "border-slate-800 hover:bg-slate-800"
                : "border-gray-100 hover:bg-gray-50"
            }`}
          >
            <FcGoogle className="text-2xl" /> Google
          </button>

          <p className="text-center mt-6 text-sm font-bold opacity-60">
            New here?{" "}
            <Link to="/register" className="text-sky-500 hover:underline">
              Create an account
            </Link>
          </p>

          {/* Quick Login Section */}
          <div className="mt-10 pt-6 border-t border-dashed border-slate-700/50 text-center">
            <p className="text-[10px] font-black uppercase tracking-[3px] opacity-40 mb-4">
              Quick Demo Access
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => fillCredentials("admin@mailinator.com")}
                className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500 text-[10px] font-black rounded-lg border border-rose-500/20 transition-all flex items-center gap-1 uppercase"
              >
                <MdSupervisorAccount /> Admin
              </button>
              <button
                onClick={() => fillCredentials("manager@mailinator.com")}
                className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-500 text-[10px] font-black rounded-lg border border-amber-500/20 transition-all flex items-center gap-1 uppercase"
              >
                <MdBadge /> Manager
              </button>
              <button
                onClick={() => fillCredentials("buyer@mailinator.com")}
                className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-500 text-[10px] font-black rounded-lg border border-emerald-500/20 transition-all flex items-center gap-1 uppercase"
              >
                <MdPerson /> Buyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
