import React, { useEffect, useState } from "react";
import Comment from "./Comment.jsx";
import AmountComments from "./AmountComments.jsx";
import { useParams, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar,
  CardHeader,
  Box,
  IconButton,
} from "@mui/material";

function getTimeOfPost(postTimestamp) {
  if (postTimestamp === null) return "Just now";
  const now = Date.now();
  const diff =
    now -
    Number(
      String(postTimestamp.seconds) +
        String(postTimestamp.nanoseconds).slice(0, 3)
    );

  // Define time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (Math.floor(diff / year) > 50) return "Just now";

  // Calculate the approximate time difference
  if (diff < minute) {
    return "Just now";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff < month) {
    const days = Math.floor(diff / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}

function FullPost() {
  const [commentId, setCommentId] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const navigate = useNavigate();
  let item = useLocation().state.post;

  const rateStar = (rate) => {
    let stars = "";
    for (let i = 0; i < rate; i++) {
      stars += "★";
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{
          pt: 8,
          minHeight: "100vh",
          backgroundColor: "#19181A",
          color: "#FFFFFF",
        }}
      >
        <Grid item xs={12} md={10} key={item.id} sx={{ m: 2 }}>
          <Card
            sx={{ backgroundColor: "#242427", color: "#FFFFFF", width: "100%" }}
          >
            <CardHeader
              avatar={<Avatar src={item.authorProfile}></Avatar>}
              title={item.author}
              titleTypographyProps={{ variant: "h6" }}
              subheader={
                <Typography>{getTimeOfPost(item.timestamp)}</Typography>
              }
            />
            <div style={{width: "100%", textAlign: "center", margin: "10px auto", backgroundColor: "#010409"}}>
              <img src={item.image} style={{objectFit: "contain", maxHeight:"700px"}} />
            </div>

            <CardContent>
              <Typography variant="h4">
                {item.title}
              </Typography>
              <Typography sx={{ color: "gold" }} variant="h5">
                {rateStar(item.rate)}
              </Typography>
              <Typography variant="h5" color="white" sx={{mt:2}}>
              <strong>Description:</strong> <br /> {item.description}
              </Typography>
              <Typography variant="h5" color="white" sx={{mt:2}}>
              <strong>Detail:</strong> <br /> {item.detail}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <IconButton aria-label="add to favorites">
                <Typography variant="h6" sx={{ color: "#FFFFFF", mr: 1 }}>
                  12
                </Typography>
                <FavoriteIcon sx={{ color: "#FFFFFF" }} />
              </IconButton> */}
              <IconButton
                aria-label="add comments"
                onClick={() => {
                  if (commentId != item.id && openComment) {
                    setCommentId(item.id);
                    return;
                  }
                  setCommentId(item.id);
                  setOpenComment(!openComment);
                }}
              >
                <AmountComments postId={item.id} />
              </IconButton>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Button onClick={()=> navigate('/')}>
                <Typography variant="subtitle1" sx={{color: "orange"}}>Home Page</Typography>
              </Button>
            </CardActions>
            <Comment
              postId={item.id}
              openComment={openComment}
              commentId={commentId}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default FullPost;
