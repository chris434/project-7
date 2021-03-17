import Navbar from "./navbar";
import Post from "./post";
import axios from "./axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import styled from "styled-components";

const cookie = new Cookies();
const PostsContainer = styled.div`
  padding: 0 2rem 0% 2rem;
`;
function Forum(props) {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    console.log("k");
    axios
      .get("/backend/getposts", {
        headers: {
          Authorization: cookie.get("Authorization"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="nav-bar">
        <Navbar {...props} />
        <button
          onClick={() => history.push("/createpost")}
          className="create-post-button">
          <FaPlus className="plus-icon" /> create post
        </button>
      </div>
      <PostsContainer>
        {posts.map((post) => {
          return <Post {...post}></Post>;
        })}
      </PostsContainer>
    </div>
  );
}
export default Forum;
