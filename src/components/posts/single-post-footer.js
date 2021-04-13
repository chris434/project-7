import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Likes from "../likes";
import Comments from "../comments";
import ToggleHeader from "../toggle-header";
import styled from "styled-components";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import PostContext from "../context/post-context";
import ToggleContext from "../context/toggle-context";

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
  const post = useContext(PostContext);
  let { state } = useLocation();
  console.log(post);
  const [postOption, setPostOption] = useState(state.content);
  const [count, setCount] = useState({});
  useEffect(() => {
    setCount({
      likeCount: post.like_count,
      commentCount: post.comment_count,
    });
  }, [setCount, post]);
  console.log(count);
  const data = {
    values: [`likes ${count.likeCount}`, `comments ${count.commentCount}`],
    icon: [<FaThumbsUp />, <FaComment />],
    stateValue: state.content,
  };
  console.log(state);
  return (
    <div>
      <hr style={{ margin: 0 }} />
      <ToggleContext.Provider value={{ count, setCount }}>
        <ToggleHeader {...data} state={(state) => setPostOption(state)} />
        <Likes
          content={postOption ? post.likes : post.comments}
          state={postOption}
        />
      </ToggleContext.Provider>
    </div>
  );
}
export default SingleFooter;
