import React, { useEffect } from "react";
import { db } from "../firebase/firebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

function Post() {
  const [post, setPost] = React.useState([]);

  const fetchPosts = async () => {
    await getDocs(query(collection(db, "posts"), orderBy("timestamp"))).then(
      (querySnapshot) => {
        const data = querySnapshot.docs.toReversed().map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPost(data);
      }
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const rateStar = (rate) => {
    let stars = "";
    for (let i = 0; i < rate; i++) {
      stars += "★";
    }
    return stars;
  };

  return (
    <Grid container spacing={3} direction="row" justifyContent="center" sx={{pt: 10}}>
      {post.map((item) => (
        <Grid item xs={11} md={3.9} key={item.id}>
          <Card sx={{backgroundColor: "#242427", color: "#FFFFFF"}}>
            <CardMedia
              sx={{ height: 300 }}
              image={item.image}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {item.title}
              </Typography>
              <Typography variant="body2" color="white">
              {item.description}
              </Typography>
              <Typography sx={{color: "gold"}}>{rateStar(item.rate)}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" sx={{color: "#E38969", ml:1}}>More Detail</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Post;
