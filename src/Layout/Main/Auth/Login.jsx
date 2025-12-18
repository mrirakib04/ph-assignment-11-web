import { Link, useNavigate } from "react-router";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext } from "react";
import MainContext from "../../../Context/MainContext";
import { FcGoogle } from "react-icons/fc";
import { HeadProvider, Title } from "react-head";

const Login = () => {
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const {
    setUser,
    setUserImage,
    setUserName,
    handleLoginEmailPassword,
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
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const target = e.target;

    const email = target.email.value;
    const password = target.password.value;

    handleLoginEmailPassword(email, password)
      .then((result) => {
        const newUser = result.user;
        console.log(newUser);
        setUser(newUser);
        setUserName(newUser.displayName);
        setUserImage(newUser.photoURL || "");

        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 2000,
        });

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

          AxiosPublic.post("/users", newUser)
            .then((res) => console.log("added new user", res))
            .catch((err) => console.log(err));
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
        <Title>Login || NextRun Tracker</Title>
      </HeadProvider>
      <Paper elevation={4} sx={{ maxWidth: 420, width: "100%", p: 4 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleLoginSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            margin="normal"
            required
          />

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
            color="success"
            variant="contained"
            sx={{
              mt: 3,
              py: 1.2,
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </Box>

        <Typography textAlign="center" mt={3} fontSize={14}>
          New user in our website?{" "}
          <Link to="/register" style={{ color: "#1976d2", fontWeight: 500 }}>
            Register
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

export default Login;
