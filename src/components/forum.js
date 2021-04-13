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
  const [data, setData] = useState([]);
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
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  console.log(data);
  // const posts = JSON.parse(props.data);

  return (
    <div>
      <Button onClick={() => history.push("/createpost")}>
        <FaPlus className="plus-icon" /> create post
      </Button>
      <PostsContainer>
        {data.map((post) => {
          const style = { marginTop: "0", height: "auto", width: "60%" };
          const data = { ...post, style, page: false };
          return (
            <PostContext.Provider value={data}>
              <Post key={post.post_id}></Post>
            </PostContext.Provider>
          );
        })}
      </PostsContainer>
    </div>
  );
}
export default Forum;
