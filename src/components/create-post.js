import { FaPen, FaImage } from "react-icons/fa";
import { useState } from "react";
import styled from "styled-components";
import WrittenPost from "./wirrten-post";
import MultiMedia from "./multi-media-post";

const CreatePostContainer = styled.div`
  background-color: white;
  padding-top: 0;
  width: 50%;
  @media (max-width: 700px) {
    width: 100%;
  }
`;
const Options = styled.section`
  ul {
    display: flex;
    margin: 0;
  }

  button {
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 1.5rem;
    padding: 1rem;

    width: auto;
    border-right: 1px black solid;
  }
  #post {
    color: ${(props) => (props.toggle ? "blue" : "black")};
    border-bottom: ${(props) =>
      props.toggle ? "blue 3px solid" : "transparent"};
  }
  #image {
    color: ${(props) => (!props.toggle ? "blue" : "black")};
    border-bottom: ${(props) =>
      !props.toggle ? "blue 3px solid" : "transparent"};
  }
  margin-bottom: 5%;
  @media (max-width: 500px) {
    button {
      font-size: 1rem;
    }
  }
`;

function CreatePost(props) {
  const [postOption, setPostOption] = useState(true);
  const toggle = (e) => {
    console.log(postOption);
    if (e.target.id === "post") {
      return setPostOption(true);
    }
    setPostOption(false);
  };
  return (
    <div className="flex-container">
      <h1 style={{ marginTop: "3%" }}>create a post</h1>
      <CreatePostContainer>
        <div>
          <Options toggle={postOption}>
            <button id="post" onClick={toggle}>
              <FaPen /> Post
            </button>
            <button id="image" onClick={toggle}>
              <FaImage /> image & video
            </button>

            <hr style={{ margin: 0 }} />
          </Options>
        </div>
        <div style={{ padding: "0 3rem 3rem 3rem" }}>
          {postOption ? <WrittenPost /> : <MultiMedia />}
        </div>
      </CreatePostContainer>
    </div>
  );
}
export default CreatePost;
