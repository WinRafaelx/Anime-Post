import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  QuerySnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUserAuth } from "../context/AuthContext";
import { Typography, TextField, Box } from "@mui/material";

function Comment({ postId, openComment, commentId }) {
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [limit, setLimit] = useState(10);

  const { user } = useUserAuth();

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const docRef = doc(db, "posts", postId);
    const colRef = collection(docRef, "comments");
    addDoc(colRef, {
      comment: comment,
      username: user.displayName,
      timestamp: serverTimestamp(),
    });
    setComment("");
  };

  const handleLimit = () => {
    setLimit(limit + 10);
    if(limit >= postComments.length) {
      setLimit(postComments.length);
    }
  };

  const handleCloseComment = () => {
    setShowMore(false);
    setLimit(10);
  };

  useEffect(() => {
    const docRef = doc(db, "posts", postId);
    const commentsQuery = query(
      collection(docRef, "comments"),
      orderBy("timestamp")
    );
    onSnapshot(commentsQuery, (querySnapshot) => {
      const newPostComments = querySnapshot.docs.toReversed().map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostComments(newPostComments);
    });
  }, []);

  return (
    <>
      <div>
        {postComments.length > 0 && openComment && commentId === postId ? (
          <Typography
            style={showMore ? { display: "none" } : { display: "block" }}
            onClick={() => setShowMore(!showMore)}
            sx={{ fontWeight: "bold", cursor: "pointer", ml: 2 }}
          >
            View all Comments
          </Typography>
        ) : (
          ""
        )}
        {showMore && openComment && commentId === postId ? (
          <>
            {postComments
              ?.filter((item, idx) => idx < limit)
              .map((data) => (
                <Typography
                  style={{ margin: "0", display: "flex" }}
                  align="justify"
                >
                  <Typography
                    variant="inherit"
                    sx={{ fontWeight: "bold", mx: 2 }}
                  >
                    {data.username}
                  </Typography>{" "}
                  {data.comment}
                </Typography>
              ))}
            <Box sx={{ display: "flex" }}>
              <Typography
                onClick={handleCloseComment}
                sx={{ fontWeight: "bold", cursor: "pointer", ml: 2, mt: 1 }}
              >
                Close Comments
              </Typography>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Typography
                onClick={handleLimit}
                sx={{ fontWeight: "bold", cursor: "pointer", mt: 1, mr: 2 }}
              >
                More
              </Typography>
            </Box>
          </>
        ) : (
          ""
        )}
      </div>
      {openComment && user && commentId === postId  ? (
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Add a comment..."
              value={comment}
              autoFocus
              color="warning"
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#3E4042",
                "& input": {
                  color: "#FFFFFF",
                },
                "& .MuiFormLabel-root": {
                  color: "#757575",
                },
              }}
              onChange={handleComment}
            />
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Comment;
