import React, { useEffect } from "react";
import { db } from "../firebase/firebase.js";
import { collection, getDocs, query } from "firebase/firestore";

function Post() {
  const [post, setPost] = React.useState([]);

  const fetchPosts = async () => {
    await getDocs(query(collection(db, "posts"))).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPost(data);
    });
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
  

  console.log(post);

  return (
    <>
      {post.map((item) => (
        <div>
          <h1>{item.title}</h1>
          <h4>{item.description}</h4>
          <img src={item.image} alt="" height={300}/> <br />
          <span>{rateStar(item.rate)}</span>
          <h3>{item.detail}</h3>
        </div>
      ))}
    </>
  );
}

export default Post;
