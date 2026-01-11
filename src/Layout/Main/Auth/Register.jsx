import { Link, useNavigate } from "react-router";
import { TextField, MenuItem, Divider } from "@mui/material";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext } from "react";
import MainContext from "../../../Context/MainContext";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { HeadProvider, Title } from "react-head";
import {
  MdPersonAdd,
  MdOutlineImage,
  MdSecurity,
  MdBadge,
} from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const {
    setUser,
    setUserImage,
    setUserName,
    handleRegisterEmailPassword,
    handleGoogle,
    theme,
  } = useContext(MainContext);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const target = e.target;

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    const role = target.role.value || "Buyer";
    const image = target.image.value || "";

    const exists = users.find((u) => u.email === email);
    if (exists) {
      toast.error("User already exists with this email");
      return;
    }

    handleRegisterEmailPassword(email, password)
      .then((result) => {
        const newUser = result.user;

        updateProfile(newUser, {
          displayName: name,
          photoURL: image,
        });

        setUser(newUser);
        setUserName(name);
        setUserImage(image || newUser.photoURL || "");

        toast.success("Registration Successful");

        const toDB = {
          name,
          email,
          image: image || newUser.photoURL || "",
          role,
          status: "pending",
        };

        AxiosPublic.post("/users", toDB);
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Register Error: ${error.message}`);
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

  // Common Input Style
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
    mb: 2.5,
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-5 py-16 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Register || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-xl w-full" data-aos="fade-up">
        <div
          className={`sm:p-8 p-4 md:p-12 rounded-4xl border transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-sky-500/10 rounded-2xl text-sky-500 text-3xl mb-4">
              <MdPersonAdd />
            </div>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
              Join <span className="text-sky-500">NextRun</span>
            </h1>
            <p className="text-sm font-bold opacity-60 mt-2 italic">
              Start your journey with us today
            </p>
          </div>

          <form onSubmit={handleRegisterSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                required
                sx={inputStyle}
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                required
                sx={inputStyle}
              />
            </div>

            <TextField
              fullWidth
              label="Photo URL"
              name="image"
              placeholder="https://example.com/photo.jpg"
              sx={inputStyle}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <TextField
                fullWidth
                select
                label="Account Role"
                name="role"
                defaultValue="Buyer"
                sx={inputStyle}
              >
                <MenuItem value="Buyer">Buyer (Default)</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="Secure Password"
                name="password"
                type="password"
                required
                sx={inputStyle}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-4 bg-sky-500 hover:bg-sky-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-sky-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-tighter"
            >
              Create Account <MdPersonAdd className="text-xl" />
            </button>
          </form>

          <div className="flex items-center my-8">
            <Divider
              className="flex-1"
              sx={{ borderColor: theme === "dark" ? "#1e293b" : "#e2e8f0" }}
            />
            <span className="px-4 text-[10px] font-black uppercase opacity-40 tracking-widest">
              Continue with
            </span>
            <Divider
              className="flex-1"
              sx={{ borderColor: theme === "dark" ? "#1e293b" : "#e2e8f0" }}
            />
          </div>

          <button
            onClick={handleGoogleMethod}
            className={`w-full py-4 border-2 rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 uppercase text-sm tracking-widest ${
              theme === "dark"
                ? "border-slate-800 hover:bg-slate-800"
                : "border-gray-100 hover:bg-gray-50"
            }`}
          >
            <FcGoogle className="text-2xl" /> Google
          </button>

          <p className="text-center mt-8 text-sm font-bold opacity-60">
            Already a member?{" "}
            <Link to="/login" className="text-sky-500 hover:underline">
              Sign In here
            </Link>
          </p>

          {/* Security Badges */}
          <div className="mt-8 flex justify-center gap-6 opacity-30">
            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter">
              <MdSecurity /> SSL Encrypted
            </div>
            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter">
              <MdBadge /> Identity Verified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
