import PostComment from "./postComment";
import styled from "styled-components";
const CommentContainer = styled.div`
  height: 50vh;
`;
const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 3rem;
    clip-path: circle();
  }
`;
function Comments(props) {
  console.log(props);
  return (
    <CommentContainer>
      <h2 style={{ textAlign: "center" }}>
        {props.comments ? props.comments.length + " comments" : ""}
      </h2>
      <PostComment />
      {props.comments
        ? props.comments.map((comment) => {
            return (
              <div>
                <CommentHeader>
                  <img src={comment.profile_image} alt={comment.first_name} />
                  <small>{comment.first_name + " " + comment.last_name}</small>
                </CommentHeader>
                <hr />
                <small>{comment.comment_content}</small>
              </div>
            );
          })
        : null}
    </CommentContainer>
  );
}
export default Comments;
