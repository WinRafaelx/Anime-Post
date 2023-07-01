import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { Container, TextField } from "@mui/material";
import Navbar from "./Navbar.jsx";
import { TextareaAutosize } from '@mui/base';
import './Css/Storage.css'

function Storage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [rate, setRate] = useState(0);
  const [file, setFile] = useState();
  const [percent, setPercent] = useState(0);

  const clearValues = () => {
    setTitle("");
    setDescription("");
    setDetail("");
    setRate(0);
    setFile(null);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please upload a image file");
      return;
    }
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addDoc(collection(db, "posts"), {
            title: title,
            description: description,
            detail: detail,
            rate: rate,
            image: url,
            timestamp: serverTimestamp(),
          });
          console.log("File available at", url);
          clearValues();
        });
      }
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#19181A",
        color: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Container sx={{ mx: "auto", pt: 10 }}>
        <TextField
          placeholder="Title"
          variant="standard"
          color="warning"
          focused
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{input: { color: 'white', fontSize: 23 }, mb: 2.5}}
          inputProps={{ maxLength: 128 }}
          className="Title"
        />
        <TextareaAutosize 
          placeholder="Description"
          className="Description"
          value={description}
          style={{color: "#FFFFFF", backgroundColor: "#242427", width: "100%", minHeight: "80px", padding: "16px", fontSize: "20px", borderRadius: "5px", border: "none", outline: "none", resize:"none", marginBottom: "15px"}}
          onChange={(e) => setDescription(e.target.value)}
          maxlength="256"
        />
        <TextareaAutosize 
          placeholder="Detail"
          className="Description"
          value={detail}
          style={{color: "#FFFFFF", backgroundColor: "#242427", width: "100%", minHeight: "380px", padding: "16px", fontSize: "20px", borderRadius: "5px", border: "none", outline: "none", resize:"none", marginBottom: "20px"}}
          onChange={(e) => setDetail(e.target.value)}
          maxlength="256"
        />
        <br />
        <input
          type="range"
          min={0}
          max={5}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Rating"
        />
        <br />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <br />
        <button onClick={handleUpload}>Submit</button>
      </Container>
    </div>
  );
}

export default Storage;
