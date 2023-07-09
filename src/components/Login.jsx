import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";
import {
  TextField,
  Button,
  Avatar,
  Link,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import Navbar from "./Navbar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { logIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        style={{
          backgroundColor: "#19181A",
          color: "#FFFFFF",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, mx: 2}}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color="warning"
            sx={{
              color: "#FFFFFF",
              backgroundColor: "#242427",
              "& input": {
                color: "#FFFFFF",
              },
              "& .MuiFormLabel-root": {
                color: "#757575",
              },
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color="warning"
            sx={{
              color: "#FFFFFF",
              backgroundColor: "#242427",
              "& input": {
                color: "#FFFFFF",
              },
              "& .MuiFormLabel-root": {
                color: "#757575",
              },
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography sx={{ color: "red" }} variant="inherit">
            {error.slice(10)}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mt: 3, mb: 2, fontWeight: 700 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link
                variant="body2"
                onClick={() => navigate("/register")}
                sx={{ color: "#EC6802", cursor: "pointer" }}
                underline="none"
              >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Login;
