import React from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

import Navbar from "./Navbar";
import './Css/Storage.css'

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");


  console.log(photoURL)

  const onSubmit = async (e) => {
    e.preventDefault();
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
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <Navbar />
      <div style={{marginTop: "80px"}}>
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
      </div>
    </>
  );
}

export default Register;
