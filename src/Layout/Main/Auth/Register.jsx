import { Link, useNavigate } from "react-router";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext } from "react";
import MainContext from "../../../Context/MainContext";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { HeadProvider, Title } from "react-head";

const Register = () => {
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const {
    setUser,
    setUserImage,
    setUserName,
    handleRegisterEmailPassword,
    handleGoogle,
  } = useContext(MainContext);

  // all users to prevent duplicate
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });
  // main register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const target = e.target;

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    const role = target.role.value || "Buyer";
    const image = target.image.value || "";

    // email duplicate check
    const exists = users.find((u) => u.email === email);
    if (exists) {
      toast.error("User already exists with this email", {
        position: "top-right",
        autoClose: 2000,
      });
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

        toast.success("Registration Successful", {
          position: "top-right",
          autoClose: 2000,
        });

        // insert new user into DB
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
        toast.error(`Register Error: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  // google register
  const handleGoogleMethod = () => {
    handleGoogle()
      .then((result) => {
        const user = result.user;

        setUser(user);
        setUserName(user.displayName);
        setUserImage(user.photoURL);

        toast.success("Google Login Successful", {
          position: "top-right",
          autoClose: 2000,
        });

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
        toast.error(`Google Login Error: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fa",
        px: 2,
        py: 10,
      }}
    >
      <HeadProvider>
        <Title>Register || NextRun Tracker</Title>
      </HeadProvider>
      <Paper elevation={4} sx={{ maxWidth: 420, width: "100%", p: 4 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleRegisterSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            margin="normal"
            required
          />

          <TextField fullWidth label="Photo URL" name="image" margin="normal" />

          <TextField
            fullWidth
            select
            label="Role"
            name="role"
            margin="normal"
            defaultValue="Buyer"
          >
            <MenuItem value="Buyer">Buyer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.2,
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Register
          </Button>
        </Box>

        <Typography textAlign="center" mt={3} fontSize={14}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1976d2", fontWeight: 500 }}>
            Login
          </Link>
        </Typography>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{
            mt: 3,
            py: 1.2,
            fontSize: 18,
            fontWeight: "bold",
            textTransform: "none",
          }}
          className="flex items-center gap-1"
          onClick={handleGoogleMethod}
        >
          <FcGoogle className="text-2xl" /> Google
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;
