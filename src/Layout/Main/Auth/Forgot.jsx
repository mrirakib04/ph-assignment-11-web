import { useState } from "react";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { HeadProvider, Title } from "react-head";
import auth from "../../../Firebase/firebase.config";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex justify-center items-center h-full w-full px-5 py-10">
      <HeadProvider>
        <Title>Forgot Password || NextRun Tracker</Title>
      </HeadProvider>

      <div className="max-w-sm p-5 w-full rounded-lg shadow-lg shadow-gray-400">
        <div className="flex flex-col gap-4 text-center">
          <h5 className="text-2xl font-bold text-green-600">Forgot Password</h5>
          <p className="text-gray-500">
            Enter your registered email address and we'll send you a reset link.
          </p>
        </div>
        <form
          onSubmit={handleForgotPassword}
          className="flex flex-col gap-4 mt-2"
        >
          <TextField
            required
            type="email"
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
            fullWidth
            sx={{ py: 1.2, fontWeight: "bold" }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
