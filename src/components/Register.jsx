import React from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
import "./Css/Register.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [error, setError] = React.useState("");

  const onSubmit = async (e) => {
    let URL;
    e.preventDefault();
    setError("");
    if(!photoURL) {
      setError("          Please upload a profile picture !")
      return;
    }
    const storageRef = ref(storage, `profiles/${photoURL.name}`);
    uploadBytes(storageRef, photoURL).then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
    }).then(() => {getDownloadURL(storageRef).then((url) => {
      URL = url;
    })});
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: displayName,
          photoURL: URL,
        });
        console.log(user);
      })
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
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{ mt: 1, mx: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="displayName"
                required
                fullWidth
                id="displayName"
                label="Display Name"
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
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                required
                style={{ backgroundColor: "#242427", width: "100%" }}
                type="file"
                id="img"
                onChange={(e) => setPhotoURL(e.target.files[0])}
              />
            </Grid>
          </Grid>

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
            {error}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mt: 3, mb: 2, fontWeight: 700 }}
            onClick={onSubmit}
          >
            Sign Up
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

export default Register;
