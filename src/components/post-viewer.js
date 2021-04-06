import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "./axios";
import Post from "./posts/post";

function PostViewer() {
  const [post, setPosts] = useState([]);
  const endpoint = useParams();
  useEffect(() => {
    const getPosts = async () => {
      const cookie = new Cookies();
      console.log(endpoint);
      try {
        const response = await axios.get(`/backend/post/${endpoint.id}`, {
          headers: {
            Authorization: cookie.get("Authorization"),
          },
        });
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);
  const style = { marginTop: "5rem", width: "60%" };
  const data = { ...post, page: true, style };
  console.log("jii");
  return (
    <div className="flex-container">
      <Post read={true} {...data} />
    </div>
  );
}
export default PostViewer;
