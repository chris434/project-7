import { FaBookmark } from "react-icons/fa";
import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import PostHeader from "../posts/post-header";
import MainFooter from "../posts/all-post-footer";
import SingleFooter from "./single-post-footer";
import PostContext from "../context/post-context";

const Post = styled.section`
  background-color: white;
  box-shadow: gray 5px 5px 5px 5px;
  margin-bottom: 3rem;
  margin-top: ${(props) => props.marginTop || 0};
  width: ${(props) => props.width || "auto"};

  @media (max-width: 800px) {
    width: 80%;
  }

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
  cursor: ${(props) => props.cursor};
  align-items: center;
  margin: 3%;
  color: black;
  text-decoration: none;
  article {
    font-size: 1.5rem;
    margin: 2rem 0.5rem 2rem 0.5rem;
    color: black;
  }
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
function PostInfo() {
  const post = useContext(PostContext);
  return (
    <PostContent
      cursor={!post.page ? "pointer" : "auto"}
      height={post.image}
      id={post.post_id}>
      {post.image ? (
        <ImageContainer>
          <img src={post.image} alt="" />
        </ImageContainer>
      ) : (
        <article>{post.text}</article>
      )}
    </PostContent>
  );
}

function Posts(props) {
  const post = useContext(PostContext);

  console.log(post.page);

  return (
    <Post {...post.style}>
      <PostHeader> </PostHeader> <hr style={{ margin: 0 }} />
      <Read read={post.read}>
        <b>
          <small>
            <FaBookmark /> {post.read ? "read" : "unread"}
          </small>
        </b>
      </Read>
      {!post.page ? (
        <Link
          to={{
            pathname: `/post/${post.post_id}`,
            state: { content: true, scroll: false },
          }}>
          <PostInfo />
        </Link>
      ) : (
        <PostInfo />
      )}
      {!post.page ? (
        <MainFooter />
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
