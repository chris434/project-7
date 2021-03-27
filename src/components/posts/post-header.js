import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const PostContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  img {
    width: 3rem;
    height: auto;
  }
  * {
    margin-right: 0.5rem;
  }
`;

function PostHeader(props) {
  const history = useHistory();
  return (
    <PostContainer>
      {props.page ? (
        <FaArrowLeft
          onClick={() => history.push("/forum")}
          fontSize="2rem"
          color="gray"></FaArrowLeft>
      ) : null}
      <img
        className="profile-image"
        src={props.profile_image}
        alt={props.first_name + " " + props.last_name}
      />
      <small style={{ fontSize: "1.5rem" }}>
        <b>{props.first_name + " " + props.last_name}</b> {props.created_date}
      </small>
    </PostContainer>
  );
}
export default PostHeader;
