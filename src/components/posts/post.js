import { FaBookmark } from "react-icons/fa";
import { useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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
  const history = useHistory();
  console.log(props);

  const singlePost = () => {
    history.push(`/post/${props.post_id}`);
  };

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
      <PostContent
        onClick={singlePost}
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
      {!props.page ? <MainFooter /> : <SingleFooter id={props.post_id} />}
    </Post>
  );
}
export default Posts;
