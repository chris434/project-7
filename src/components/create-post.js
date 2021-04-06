import { FaPen, FaImage } from "react-icons/fa";
import { useState } from "react";
import styled from "styled-components";
import WrittenPost from "./wirrten-post";
import MultiMedia from "./multi-media-post";
import ToggleHeader from "./toggle-header";

const CreatePostContainer = styled.div`
  background-color: white;
  padding-top: 0;
  width: 50%;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

function CreatePost(props) {
  const [postOption, setPostOption] = useState(true);

  const data = {
    values: ["post", "image"],
    icon: [<FaPen />, <FaImage />],
    stateValue: true,
    likeCount: props.likeCount,
  };
  return (
    <div className="flex-container">
      <h1 style={{ marginTop: "3%" }}>create a post</h1>
      <CreatePostContainer>
        <ToggleHeader {...data} state={(state) => setPostOption(state)} />
        <div style={{ padding: "0 3rem 3rem 3rem" }}>
          {postOption ? <WrittenPost /> : <MultiMedia />}
        </div>
      </CreatePostContainer>
    </div>
  );
}
export default CreatePost;
