import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LikesAndComments from "../likesAndComments";
import ToggleHeader from "../toggle-header";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import PostContext from "../context/post-context";
import ToggleContext from "../context/toggle-context";
import LikesAdComments from "../likesAndComments";

function SingleFooter(props) {
  const post = useContext(PostContext);
  let { state } = useLocation();
  console.log(state);
  const [postOption, setPostOption] = useState(state ? state.content : "");
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
  return (
    <div>
      <hr style={{ margin: 0 }} />
      <ToggleContext.Provider value={{ count, setCount }}>
        <ToggleHeader {...data} state={(state) => setPostOption(state)} />
        <LikesAdComments
          content={postOption ? post.likes : post.comments}
          state={postOption}
        />
      </ToggleContext.Provider>
    </div>
  );
}
export default SingleFooter;
