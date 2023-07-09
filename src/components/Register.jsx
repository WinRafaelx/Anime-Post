import React from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
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
import './Css/Storage.css'

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [error, setError] = React.useState("");


  console.log(photoURL)

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(photoURL);
        updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL,
        });
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <Navbar />
      {/* <div style={{marginTop: "80px"}}>
        <span>Profile Image (Image Address/ URL)</span>
        <input type="text" value={photoURL} onChange={e => setPhotoURL(e.target.value)} />
        <br />
        <span>Email</span>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <span>Name</span>
        <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <br />
        <span>Password</span>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <button onClick={onSubmit}>Send</button>
        <button onClick={() => setPhotoURL("https://fakeimg.pl/150x150?text=User")}>Meow</button>
      </div> */}
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
          sx={{ mt: 1, mx: 2, maxWidth: "450px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="displayName"
            label="Display Name"
            name="displayName"
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
            onChange={(e) => setDisplayName(e.target.value)}
          />
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
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Register;
