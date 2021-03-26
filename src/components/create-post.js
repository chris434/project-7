import axios from "./axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Button from "./styled-button";
const CreatePostContainer = styled.div`
  background-color: white;
  padding: 3%;
  width: 50%;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

function CreatePost(props) {
  const history = useHistory();
  const [post, setPost] = useState({ value: "", length: 0 });
  const [error, setError] = useState();
  const updateLength = (e) => {
    const { value } = e.target;
    setPost({ value: value, length: value.length });
  };
  const submitPost = async () => {
    try {
      const cookie = new Cookies();
      if (post.value) {
        const response = await axios.post(
          "/backend/createpost",
          { data: post.value },
          {
            headers: {
              Authorization: cookie.get("Authorization"),
            },
          }
        );

        if (response.status === 200) {
          history.push("/forum");
        }
      } else {
        setError("field is required");
      }
    } catch {
      console.log("unable to submit post");
    }
  };

  return (
    <>
      <h1 style={{ marginTop: "3%" }}>create a post</h1>
      <CreatePostContainer>
        <div>
          <small style={{ float: "right", fontSize: "1.5rem" }}>
            {post.length}/255
          </small>
        </div>
        <textarea
          style={{ marginBottom: "2%" }}
          onChange={updateLength}
          maxLength="255"
          placeholder="what is on your mind?"
          className="post-textArea"></textarea>
        <small style={{ margin: "0" }} className="error">
          {error}
        </small>
        <br />
        <Button
          style={{ marginTop: "2%" }}
          className="create-post-button"
          onClick={submitPost}>
          create post
        </Button>
      </CreatePostContainer>
    </>
  );
}
export default CreatePost;
