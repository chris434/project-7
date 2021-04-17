import styled from "styled-components";
import { useContext } from "react";
import PostContext from "../context/post-context";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const PostContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  img {
    width: 3rem;
    height: auto;
    margin: 0 1rem 0 1rem;
  }
  small {
    font-size: 1.5rem;
  }
  * {
    margin-right: 0.5rem;
  }
  @media (max-width: 600px) {
    img {
      width: 2.5rem;
    }
    small {
      font-size: 1rem;
    }
  }
`;

function PostHeader(props) {
  const history = useHistory();
  const post = useContext(PostContext);
  console.log(post);
  return (
    <PostContainer>
      {post.page ? (
        <FaArrowLeft
          onClick={() => history.push("/")}
          fontSize="2rem"
          color="gray"></FaArrowLeft>
      ) : null}
      <img
        className="profile-image"
        style={{ cursor: "auto" }}
        src={post.profile_image}
        alt={post.first_name + " " + post.last_name}
      />
      <small>
        <b>{post.first_name + " " + post.last_name}</b> <br />
        {post.created_date}
      </small>
    </PostContainer>
  );
}
export default PostHeader;
