import { useState } from "react";
import Likes from "../likes";
import Comments from "../comments";
import ToggleHeader from "../toggle-header";
import styled from "styled-components";
import { FaThumbsUp, FaComment } from "react-icons/fa";

const LikeSection = styled.section`
  font-size: 2rem;
  padding: 0 2rem 0 2rem;
  margin-bottom: 5%;
  div {
    display: flex;
    align-items: center;
    * {
      margin-right: 1rem;
    }
  }
  img {
    width: 3rem;
    clip-path: circle();
  }
`;

function SingleFooter(props) {
  const [postOption, setPostOption] = useState(true);
  const data = {
    values: [`likes ${props.likeCount}`, `comments ${props.commentCount}`],
    icon: [<FaThumbsUp />, <FaComment />],
    stateValue: true,
  };
  console.log(props);
  return (
    <div>
      <hr style={{ margin: 0 }} />
      <ToggleHeader {...data} state={(state) => setPostOption(state)} />
      <Likes
        content={postOption ? props.likes : props.comments}
        state={postOption}
      />
    </div>
  );
}
export default SingleFooter;
