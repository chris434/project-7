import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import PostContext from "./context/post-context";
import Cookies from "universal-cookie";
import axios from "./axios";
import Post from "./posts/post";
import NoResult from "./404";

function PostViewer() {
  document.title = "post";
  const [post, setPosts] = useState([]);
  const [hasPost, setHasPost] = useState(true);
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
        setHasPost(false);
      }
    };
    getPosts();
  }, []);
  const style = { marginTop: "5rem", width: "60%" };

  const data = { ...post, page: true, style };
  console.log("jii");
  console.log(data);
  return (
    <>
      {hasPost ? (
        <PostContext.Provider value={post}>
          <div className="flex-container">
            <Post read={true} {...data} />
          </div>
        </PostContext.Provider>
      ) : (
        <NoResult type={"post"}></NoResult>
      )}
    </>
  );
}
export default PostViewer;
