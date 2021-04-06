import { useState } from "react";
import Likes from "../likes";
import Comments from "../comments";
import ToggleHeader from "../toggle-header";
import { FaThumbsUp, FaComment } from "react-icons/fa";

function SingleFooter(props) {
  const [postOption, setPostOption] = useState(true);
  const data = {
    values: [`likes ${props.likeCount}`, `comments`],
    icon: [<FaThumbsUp />, <FaComment />],
    stateValue: true,
  };
  console.log(props);
  return (
    <div>
      <hr style={{ margin: 0 }} />
      <ToggleHeader {...data} state={(state) => setPostOption(state)} />

      {postOption ? <Likes likes={props.likes} /> : <Comments />}
    </div>
  );
}
export default SingleFooter;
