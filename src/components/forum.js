import Post from "./posts/post";
import axios from "./axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const PostsContainer = styled.div`
  padding: 0 2rem 0% 2rem;
`;
const Button = styled.button`
  border-radius: 50px;
  border: rgb(74, 133, 16) 5px solid;
  background-color: rgb(74, 133, 16);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 3rem 0 5% 3%;
  padding: 2%;
  outline: none;
  :hover {
    background-color: white;
    color: black;
  }
`;

function Forum(props) {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const cookie = new Cookies();
      console.log("kk");
      try {
        const response = await axios.get("/backend/posts", {
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

  console.log(posts);
  // const posts = JSON.parse(props.data);

  return (
    <div>
      <Button onClick={() => history.push("/createpost")}>
        <FaPlus className="plus-icon" /> create post
      </Button>
      <PostsContainer>
        {posts.map((post) => {
          const style = { marginTop: "0", height: "auto", width: "100%" };
          const data = { ...post, style };
          return <Post key={post.post_id} {...data}></Post>;
        })}
      </PostsContainer>
    </div>
  );
}
export default Forum;
