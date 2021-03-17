import { FaComment, FaThumbsUp, FaBookmark } from "react-icons/fa";
import { base64StringToBlob } from "blob-util";
import { useRef } from "react";
import styled from "styled-components";
function Posts(props) {
  const PostHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    img {
      width: 3rem;
      margin-right: 2%;
      height: auto;
    }
  `;

  const Post = styled.section`
    background-color: white;
    box-shadow: gray 5px 5px 5px 5px;
    margin-bottom: 3rem;
  `;
  const Section = styled.div`
    padding: 1rem;
    * {
      margin-right: 1rem;
    }
  `;
  const text = useRef();
  console.log(text.current);
  const blob = base64StringToBlob(props.profile_image, "image/png");
  const url = URL.createObjectURL(blob);
  return (
    <Post>
      <PostHeader>
        <img
          className="profile-image"
          src={url}
          alt={props.first_name + " " + props.last_name}
        />
        <small style={{ fontSize: "1.5rem" }}>
          <b>{props.first_name + " " + props.last_name}</b> {props.created_date}
        </small>
      </PostHeader>
      <hr style={{ margin: 0 }} />
      <div className="read">
        <b>
          <small>
            <FaBookmark /> {props.read}
          </small>
        </b>
      </div>

      <article ref={text} style={{ fontSize: "2rem", margin: "3%" }}>
        {props.post_content}
      </article>

      <Section>
        <small style={{ fontSize: "1.2rem" }}>0 likes</small>
        <small style={{ fontSize: "1.2rem" }}>0 comments</small>
      </Section>
      <hr />
      <Section>
        <FaThumbsUp color="grey" fontSize="1.5rem" />

        <FaComment color="grey" fontSize="1.5rem" />
      </Section>
    </Post>
  );
}
export default Posts;
