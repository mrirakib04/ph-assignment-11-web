import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  Chip,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { updateProfile } from "firebase/auth";
import { HeadProvider, Title } from "react-head";
import MainContext from "../../../Context/MainContext";
import auth from "../../../Firebase/firebase.config";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import {
  MdVerified,
  MdOutlineAddPhotoAlternate,
  MdOutlineDriveFileRenameOutline,
  MdInfo,
} from "react-icons/md";

const Profile = () => {
  const { user, theme } = useContext(MainContext);
  const [userName, setUserName] = useState(user?.displayName);
  const [userImage, setUserImage] = useState(user?.photoURL);
  const [isNameSubmitting, setIsNameSubmit] = useState(false);
  const [isImageSubmitting, setIsImageSubmit] = useState(false);

  const AxiosPublic = useAxiosPublic();

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    retry: 3,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const updateName = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setIsNameSubmit(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name });
      toast.success("Name updated successfully!");
      setUserName(name);
    } catch (error) {
      toast.error(`Failed: ${error.message}`);
    } finally {
      setIsNameSubmit(false);
    }
  };

  const updateImage = async (e) => {
    e.preventDefault();
    const imageURL = e.target.imageURL.value;
    setIsImageSubmit(true);
    try {
      await updateProfile(auth.currentUser, { photoURL: imageURL });
      toast.success("Photo updated successfully!");
      setUserImage(imageURL);
    } catch (error) {
      toast.error(`Failed: ${error.message}`);
    } finally {
      setIsImageSubmit(false);
    }
  };

  // Common Input Styles
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
      className={`min-h-[90vh] py-10 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <HeadProvider>
        <Title>Profile || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-center">
          {/* Left Side: Profile Card */}
          <div
            className="lg:col-span-5 w-full flex h-full"
            data-aos="fade-right"
          >
            <div
              className={`relative overflow-hidden w-full p-4 sm:p-8 rounded-[2.5rem] border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 shadow-2xl"
                  : "bg-white border-gray-100 shadow-xl"
              }`}
            >
              {/* Decorative Background */}
              <div className="absolute top-0 left-0 w-full h-32 bg-sky-500/10"></div>

              <div className="relative flex flex-col items-center pt-8">
                <div className="relative">
                  <Avatar
                    src={userImage || "https://i.ibb.co/jZ67CdJ2/download.jpg"}
                    alt={userName}
                    sx={{
                      width: 140,
                      height: 140,
                      border: "6px solid",
                      borderColor: theme === "dark" ? "#0f172a" : "white",
                    }}
                    className="shadow-2xl"
                  />
                  {userInfo?.status === "active" && (
                    <MdVerified className="absolute bottom-2 right-2 text-3xl text-sky-500 bg-white rounded-full p-0.5" />
                  )}
                </div>

                <div className="text-center mt-6">
                  <h2 className="sm:text-2xl text-xl font-black uppercase tracking-tight">
                    {userName || "User Name"}
                  </h2>
                  <p className="text-sm font-bold opacity-50 tracking-wide mt-1">
                    {user?.email}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  <Chip
                    label={userInfo?.role}
                    className="font-black uppercase text-[10px]! tracking-widest"
                    sx={{ bgcolor: "#0ea5e9", color: "white" }}
                  />
                  <Chip
                    label={userInfo?.status}
                    className="font-black uppercase text-[10px]! tracking-widest"
                    color={userInfo?.status === "active" ? "success" : "error"}
                    variant="outlined"
                  />
                </div>

                {userInfo?.managerFor && (
                  <div
                    className={`mt-6 p-4 w-full rounded-2xl border border-dashed flex items-center gap-3 ${
                      theme === "dark"
                        ? "bg-slate-950/50 border-slate-800"
                        : "bg-sky-50 border-sky-100"
                    }`}
                  >
                    <MdInfo className="text-sky-500 text-xl" />
                    <p className="text-xs font-bold uppercase tracking-tight opacity-70">
                      Assigned to:{" "}
                      <span className="text-sky-500">
                        {userInfo?.managerFor}
                      </span>
                    </p>
                  </div>
                )}

                {userInfo?.suspendReason && (
                  <div className="mt-4 p-4 w-full rounded-2xl bg-rose-500/10 border border-rose-500/20">
                    <p className="text-xs font-bold text-rose-500 uppercase tracking-tighter">
                      Suspension Reason:{" "}
                      <span className="text-rose-400 font-medium">
                        {userInfo.suspendReason}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Update Panel */}
          <div
            className="lg:col-span-7 w-full space-y-6 flex h-full"
            data-aos="fade-left"
          >
            <div
              className={`sm:p-8 p-4 md:p-10 rounded-[2.5rem] border transition-all duration-300 w-full ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 shadow-2xl"
                  : "bg-white border-gray-100 shadow-xl"
              }`}
            >
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-2">
                Account <span className="text-sky-500">Settings</span>
              </h3>

              <div className="space-y-10">
                {/* Update Name Section */}
                <form onSubmit={updateName} className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[3px] opacity-40 mb-2">
                    <MdOutlineDriveFileRenameOutline className="text-lg" />{" "}
                    Profile Name
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <TextField
                      fullWidth
                      name="name"
                      label="Display Name"
                      variant="outlined"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      sx={inputStyle}
                    />
                    <Button
                      type="submit"
                      disabled={isNameSubmitting}
                      className="h-14 px-8 rounded-xl font-black uppercase tracking-tighter"
                      variant="contained"
                      sx={{
                        bgcolor: "#0ea5e9",
                        "&:hover": { bgcolor: "#0284c7" },
                      }}
                    >
                      {isNameSubmitting ? "Wait..." : "Update"}
                    </Button>
                  </div>
                </form>

                <Divider
                  sx={{ borderColor: theme === "dark" ? "#1e293b" : "#f1f5f9" }}
                />

                {/* Update Photo Section */}
                <form onSubmit={updateImage} className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[3px] opacity-40 mb-2">
                    <MdOutlineAddPhotoAlternate className="text-lg" /> Profile
                    Picture
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <TextField
                      fullWidth
                      name="imageURL"
                      label="Image URL Link"
                      variant="outlined"
                      value={userImage}
                      onChange={(e) => setUserImage(e.target.value)}
                      sx={inputStyle}
                    />
                    <Button
                      type="submit"
                      disabled={isImageSubmitting}
                      className="h-14 px-8 rounded-xl font-black uppercase tracking-tighter"
                      variant="contained"
                      sx={{
                        bgcolor: "#0ea5e9",
                        "&:hover": { bgcolor: "#0284c7" },
                      }}
                    >
                      {isImageSubmitting ? "Wait..." : "Update"}
                    </Button>
                  </div>
                </form>
              </div>

              <p className="mt-12 text-center text-[10px] font-black uppercase tracking-[4px] opacity-20">
                NextRun Cloud Data Sync Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
