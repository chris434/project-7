import Post from "./posts/post";
import axios from "./axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import styled from "styled-components";
import PostContext from "./context/post-context";

const PostsContainer = styled.div`
  padding: 0 2rem 0% 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media (max-width: 400px) {
    padding: 0;
  }
`;
const Button = styled.button`
  border-radius: 50px;
  border: rgb(74, 133, 16) 5px solid;
  background-color: rgb(74, 133, 16);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem 0 5% 3%;
  padding: 2%;
  outline: none;
  :hover {
    background-color: white;
    color: black;
  }
`;

function Forum(props) {
  const history = useHistory();
  const [data, setData] = useState([]);
  document.title = "forum";
  useEffect(() => {
    const getPosts = async () => {
      const cookie = new Cookies();

      try {
        const response = await axios.get("/backend/posts", {
          headers: {
            Authorization: cookie.get("Authorization"),
          },
        });

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      <Button onClick={() => history.push("/createpost")}>
        <FaPlus className="plus-icon" /> create post
      </Button>
      <PostsContainer>
        {data.map((post) => {
          const style = { marginTop: "0", height: "auto", width: "60%" };
          const data = { ...post, style, page: false };
          console.log(data.post_id);
          return (
            <PostContext.Provider key={post.post_id} value={data}>
              <Post></Post>
            </PostContext.Provider>
          );
        })}
      </PostsContainer>
    </div>
  );
}
export default Forum;
