import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./axios";
import Cookies from "universal-cookie";
const Button = styled.button`
  background-color: rgb(74, 133, 16);
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-color: rgb(74, 133, 16);
  outline: none;
  margin-right: 0.5rem;
  cursor: "pointer";
`;
const ButtonsContainer = styled.div`
  display: ${(props) => props.state};
  justify-content: flex-end;
`;
const Input = styled.textarea`
  width: 95%;
  margin: 2.5%;
  font-size: 1.5rem;
  resize: none;
  height: ${(props) => props.height};
  border: none;
  outline: none;
  margin: 0;
`;
const PostCommentContainer = styled.div`
  margin: 5%;
`;
function PostComment(props) {
  const param = useParams();
  const comment = useRef();
  const submit = useRef();
  const [height, setHeight] = useState("1.5rem");
  const [lines, SetLines] = useState();
  const [toggle, setToggle] = useState("none");

  const submitComment = async () => {
    try {
      const cookie = new Cookies();
      console.log(cookie.get("Authorization"));
      await axios.post(
        `/backend/comment/${param.id}`,
        { comment: comment.current.value },
        {
          headers: {
            Authorization: cookie.get("Authorization"),
          },
        }
      );

      const data = props.comments;

      data.push({
        first_name: "bob",
        last_name: "joy",
        comment_content: comment.current.value,
      });
      props.state(data);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleController = () => {
    comment.current.value = "";
    return setToggle("none");
  };

  const checkHeight = () => {
    const currentValue = comment.current.value.split("\n").length;
    if (comment.current.scrollHeight > comment.current.clientHeight) {
      setHeight(comment.current.scrollHeight + "px");
    }
    if (currentValue < lines) {
      setHeight(comment.current.scrollHeight - 30 + "px");
    }
    SetLines(comment.current.value.split("\n").length);
  };

  useEffect(() => {
    checkHeight();
  }, []);

  return (
    <PostCommentContainer>
      <Input
        height={height}
        ref={comment}
        onClick={() => setToggle("flex")}
        onChange={checkHeight}
        type="text"
        placeholder="write comment"
      />
      <hr style={{ borderColor: "blue" }} />
      <br />
      <ButtonsContainer state={toggle}>
        <Button onClick={submitComment} ref={submit}>
          submit
        </Button>
        <Button onClick={toggleController}>cancel</Button>
      </ButtonsContainer>
    </PostCommentContainer>
  );
}
export default PostComment;
