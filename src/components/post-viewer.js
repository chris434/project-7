import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostContext from "./context/post-context";
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
        setPosts({
          ...response.data,
          read: true,
          page: true,
          style: { marginTop: "2rem", width: "60%", height: "auto" },
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);
  const style = { marginTop: "5rem", width: "60%" };

  const data = { ...post, page: true, style };
  console.log("jii");
  console.log(data);
  return (
    <PostContext.Provider value={post}>
      <div className="flex-container">
        <Post read={true} {...data} />
      </div>
    </PostContext.Provider>
  );
}
export default PostViewer;
