import { FaBookmark } from "react-icons/fa";
import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import PostHeader from "../posts/post-header";
import MainFooter from "../posts/all-post-footer";
import SingleFooter from "./single-post-footer";

const Post = styled.section`
  background-color: white;
  box-shadow: gray 5px 5px 5px 5px;
  margin-bottom: 3rem;
  margin-top: ${(props) => props.marginTop || 0};
  width: ${(props) => props.width || "auto"};

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Read = styled.div`
  font-size: 1.5rem;

  color: ${(props) => (props.read ? "green" : "red")};

  margin: 1rem 0 0 1rem;
`;
const PostContent = styled.div`
  font-size: 2rem;
  cursor: pointer;

  height: ${(props) => props.height || "auto"};

  margin: 3%;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 50%;
  }

  @media (max-width: 500px) {
    img {
      width: 90%;
    }
  }
`;

function Posts(props) {
  const postContent = useRef();
  const param = useParams();
  console.log(param);
  console.log(props);

  return (
    <Post {...props.style}>
      <PostHeader {...props}> </PostHeader> <hr style={{ margin: 0 }} />
      <Read read={props.read}>
        <b>
          <small>
            <FaBookmark /> {props.read ? "read" : "unread"}
          </small>
        </b>
      </Read>
      <Link to={{ pathname: `/post/${props.post_id}`, state: "likes" }}>
        <PostContent
          height={props.style.height}
          ref={postContent}
          id={props.post_id}>
          {props.image_url ? (
            <ImageContainer>
              <img src={props.image_url} alt="" />
            </ImageContainer>
          ) : (
            <article>{props.post_content}</article>
          )}
        </PostContent>
      </Link>
      {!props.page ? (
        <MainFooter
          like_count={props.like_count}
          liked={props.liked}
          post_id={props.post_id}
        />
      ) : (
        <SingleFooter
          id={props.post_id}
          likeCount={props.like_count}
          commentCount={props.comment_count}
          likes={props.likes}
          comments={props.comments}
        />
      )}
    </Post>
  );
}
export default Posts;
