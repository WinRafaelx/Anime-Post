import React, { useState, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Typography } from "@mui/material";

function AmountComments({ postId }) {
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    const docRef = doc(db, "posts", postId);
    onSnapshot(collection(docRef, "comments"), (querySnapshot) => {
      const newPostComments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostComments(newPostComments);
    });
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#FFFFFF", mr: 1 }}>
        {postComments.length > 0 ? <>{postComments.length}</> : ""}
      </Typography>
      <ChatBubbleOutlineOutlinedIcon sx={{ color: "#FFFFFF" }} />
    </>
  );
}

export default AmountComments;
