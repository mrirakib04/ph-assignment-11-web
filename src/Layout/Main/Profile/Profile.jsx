import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Avatar, Button, Chip, TextField, Typography } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { HeadProvider, Title } from "react-head";
import MainContext from "../../../Context/MainContext";
import auth from "../../../Firebase/firebase.config";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Profile = () => {
  const { user } = useContext(MainContext);
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

  console.log(userInfo);

  const updateName = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setIsNameSubmit(true);

    try {
      await updateProfile(auth.currentUser, { displayName: name });
      toast.success("Name updated successfully!", { position: "top-center" });
      setUserName(name);
    } catch (error) {
      toast.error(`Failed to update name: ${error.message}`);
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
      toast.success("Photo updated successfully!", { position: "top-center" });
      setUserImage(imageURL);
    } catch (error) {
      toast.error(`Failed to update photo: ${error.message}`);
    } finally {
      setIsImageSubmit(false);
    }
  };

  return (
    <div className="w-full flex md:flex-row justify-center flex-col items-center gap-5 mt-5 sm:mt-10 px-5 py-10">
      <HeadProvider>
        <Title>Profile || NextRun Tracker</Title>
      </HeadProvider>
      <div className="flex flex-col items-center gap-3 w-full max-w-md bg-linear-to-b from-teal-900 to-white py-10 rounded-xl shadow-lg text-center">
        <Avatar
          src={userImage || "https://i.ibb.co/jZ67CdJ2/download.jpg"}
          alt={userName || "User Photo"}
          sx={{ width: 160, height: 160 }}
          className="bg-gray-300"
        />
        <Typography variant="h5" className="font-bold mt-3">
          {userName}
        </Typography>
        <Typography variant="body1" className="text-gray-600 font-semibold">
          {user?.email || "user@example.com"}
        </Typography>
        <div className="flex items-center gap-3">
          <Chip label={userInfo?.role} color="primary"></Chip>
          <Chip
            label={userInfo?.status}
            color={
              userInfo?.status === "active"
                ? "success"
                : userInfo?.status === "suspended"
                ? "error"
                : "warning"
            }
          />
        </div>
        {userInfo?.managerFor && (
          <Chip
            label={`Assigned to: ${userInfo?.managerFor}`}
            color="secondary"
          ></Chip>
        )}
        {userInfo?.suspendReason && (
          <p className="font-medium text-red-700 text-center">
            <span className="font-bold">Reason:</span> {userInfo.suspendReason}
          </p>
        )}
      </div>

      <div className="w-full max-w-md flex flex-col gap-6 justify-center">
        {/* Update Name */}
        <form onSubmit={updateName} className="flex flex-col gap-2">
          <TextField
            required
            name="name"
            label="New Name"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            className="font-medium! py-2!"
            disabled={isNameSubmitting}
          >
            {isNameSubmitting ? "Updating..." : "Update Name"}
          </Button>
        </form>

        {/* Update Image */}
        <form onSubmit={updateImage} className="flex flex-col gap-2">
          <TextField
            required
            name="imageURL"
            label="New Photo URL"
            variant="outlined"
            value={userImage}
            onChange={(e) => setUserImage(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            className="font-medium! py-2!"
            disabled={isImageSubmitting}
          >
            {isImageSubmitting ? "Updating..." : "Update Photo"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
