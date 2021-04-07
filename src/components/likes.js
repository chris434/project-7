import styled from "styled-components";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import PostComment from "./postComment";

const LikeSection = styled.section`
  font-size: 2rem;
  padding: 2rem;
  margin: 5%;
  border: ${(props) => (!props.state ? "1px solid black" : "none")};
  #header {
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
const CommentBody = styled.p`
  font-size: 1.5rem;
`;
function Likes(props) {
  const [data, setData] = useState(props.content);
  const update = (state) => {
    console.log(state);

    setData(state);
    console.log(data);
  };

  useEffect(() => {
    if (props.content) {
      return setData(props.content);
    }
  }, [props]);
  console.log(data);
  return (
    <div>
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
              <LikeSection state={props.state}>
                <div id="header">
                  {props.state ? <FaThumbsUp color="blue"></FaThumbsUp> : ""}

                  <img src={item.profile_image} alt={item.first_name} />
                  <small>{item.first_name + " " + item.last_name}</small>
                  {!props.state ? <small>{item.created_time}</small> : ""}
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
export default Likes;
