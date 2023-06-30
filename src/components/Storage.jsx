import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase.js";
import { ref, uploadBytesResumable , getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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
  }


  const handleUpload = () => {
    if(!file) {
      alert("Please upload a image file");
      return;
    }
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPercent(progress);
    }, (err=> console.log(err)), () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        addDoc(collection(db, "posts"), {
          title: title,
          description: description,
          detail: detail,
          rate: rate,
          image: url,
          timestamp: serverTimestamp()
        })
        console.log("File available at", url);
        clearValues();
      });
    });
  };


  return (
    <>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <br />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <br />
      <textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Detail" />
      <br />
      <input type="range" min={0} max={5} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Rating" />
      <br />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <button onClick={handleUpload}>Submit</button>
    </>
  );
}

export default Storage;
