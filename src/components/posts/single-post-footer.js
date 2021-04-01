import styled from "styled-components";
import { useState } from "react";

const LikeLink = styled.button`
  border-color: black;
  border-style: solid;
  background-color: white;
  outline: none;
  font-size: 1.5rem;
  padding: 1rem;
  flex-grow: 10;
  border-width: ${(props) =>
    props.toggle ? "1px 1px 0px 0px" : "0px 0px 1px 0px"};
`;
const CommentLink = styled.button`
  border-color: black;
  border-style: solid;
  background-color: white;
  outline: none;
  font-size: 1.5rem;
  color: black;
  padding: 1rem;
  flex-grow: 10;
  border-width: ${(props) =>
    !props.toggle ? "1px 0px 0px 1px" : "0px 0px 1px 0px"};
`;
const PostFooter = styled.div`
  font-size: 1.5rem;
  display: flex;
`;

function SingleFooter(props) {
  const [toggle, setToggle] = useState(false);
  const [connect, setContent] = useState("0 likes");
  const contentSwitch = (e) => {
    if (toggle) {
      console.log(e.target);
      setContent(e.target.innerHTML);
      return setToggle(false);
    }
    setContent(e.target.innerHTML);
    setToggle(true);
  };

  return (
    <div>
      <PostFooter>
        <LikeLink id={props.id} onClick={contentSwitch} toggle={toggle}>
          likes {props.like_count}
        </LikeLink>

        <div
          style={{
            borderBottom: "1px black solid",
            flexGrow: 80,
          }}></div>
        <CommentLink id={props.id} onClick={contentSwitch} toggle={toggle}>
          comments 0
        </CommentLink>
      </PostFooter>
      <div style={{ height: "20vh", textAlign: "center" }}>
        <h2>{connect}</h2>
      </div>
    </div>
  );
}
export default SingleFooter;
