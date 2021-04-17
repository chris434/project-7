import styled from "styled-components";
import { useRef, useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "./axios";
import Cookies from "universal-cookie";
import UserContext from "./context/userContext";
import ToggleContext from "./context/toggle-context";

const Button = styled.button`
  background-color: ${(props) => (props.state ? "rgb(74, 133, 16)" : "gray")};
  border-color: ${(props) => (props.state ? "rgb(74, 133, 16)" : "gray")};
  cursor: ${(props) => (props.state ? "pointer" : "not-allowed")};
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem;

  outline: none;
  margin-right: 0.5rem;
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
  const { state } = useLocation();

  const comment = useRef();

  const user = useContext(UserContext);
  const { count, setCount } = useContext(ToggleContext);

  const [height, setHeight] = useState("1.5rem");
  const [lines, SetLines] = useState();
  const [toggle, setToggle] = useState("none");
  const [input, setInput] = useState({ value: "", active: false });

  const submitComment = async () => {
    try {
      const cookie = new Cookies();
      console.log(cookie.get("Authorization"));
      const response = await axios.post(
        `/backend/comment/${param.id}`,
        { comment: comment.current.value },
        {
          headers: {
            Authorization: cookie.get("Authorization"),
          },
        }
      );

      const data = props.comments;
      console.log(response);
      data.unshift({
        comment_id: response.data,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image,
        comment_content: input.value,
        created_time: "now",
      });
      comment.current.value = "";
      setToggle("none");

      setCount({
        commentCount: count.commentCount + 1,
        likeCount: count.likeCount,
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

  const checkHeight = (e) => {
    const input = e.target;
    const currentValue = input.value.split("\n").length;
    if (input.scrollHeight > input.clientHeight) {
      setHeight(input.scrollHeight + "px");
    }
    if (currentValue < lines) {
      setHeight(input.scrollHeight - 30 + "px");
    }
    SetLines(input.value.split("\n").length);

    if (input.value.length !== 0) {
      return setInput({ value: input.value, active: true });
    }
    setInput({ value: input.value, active: false });
  };

  useEffect(() => {
    if (state.focus) {
      comment.current.focus();
      setToggle("flex");
    }
    return () => {
      state.focus = false;
      setToggle("none");
    };
  }, [state]);

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
        <Button
          state={input.active}
          disabled={!input.active}
          onClick={submitComment}>
          submit
        </Button>
        <Button state={true} onClick={toggleController}>
          cancel
        </Button>
      </ButtonsContainer>
    </PostCommentContainer>
  );
}
export default PostComment;
