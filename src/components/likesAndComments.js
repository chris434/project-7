import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import PostComment from "./postComment";

const LikeSection = styled.section`
  font-size: 2rem;
  padding: 2rem;
  margin: 1rem;
  border: ${(props) => (!props.state ? "1px solid black" : "none")};
  #header {
    display: flex;
    align-items: center;
  }
  img {
    width: 3rem;
    margin: 0.5rem;
    clip-path: circle();
  }
  b {
    margin: 0;
  }
  small {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    padding: 0.5rem;
    img {
      width: 2.5rem;
    }
    small {
      font-size: 1rem;
    }
  }
`;
const CommentBody = styled.p`
  font-size: 1.5rem;
`;
function LikesAdComments(props) {
  const contentContainer = useRef();
  const { state } = useLocation();
  const [data, setData] = useState(props.content);

  const update = (state) => {
    setData([...state]);
  };

  useEffect(() => {
    if (state.scroll) {
      window.scrollTo(0, contentContainer.current.offsetTop);
    }

    if (props.content) {
      return setData(props.content);
    }
  }, [props, state]);

  return (
    <div ref={contentContainer}>
      {data ? (
        <h2 style={{ textAlign: "center" }}>
          {`${data.length} ${props.state ? "likes" : "comments"}`}
        </h2>
      ) : (
        ""
      )}
      {!props.state ? (
        <PostComment state={(state) => update(state)} comments={data} />
      ) : (
        ""
      )}
      {data
        ? data.map((item) => {
            return (
              <LikeSection
                key={props.state ? item.like_id : item.comment_id}
                state={props.state}>
                <div id="header">
                  {props.state ? <FaThumbsUp color="blue"></FaThumbsUp> : ""}
                  <img src={item.profile_image} alt={item.first_name} />
                  <small>
                    <b>{item.first_name + " " + item.last_name}</b>
                    <br />
                    {!props.state ? item.created_time : ""}
                  </small>
                  <br />
                </div>

                <hr />
                {!props.state ? (
                  <CommentBody>{item.comment_content}</CommentBody>
                ) : (
                  ""
                )}
              </LikeSection>
            );
          })
        : null}
    </div>
  );
}
export default LikesAdComments;
