import { FaBookmark } from "react-icons/fa";
import { base64StringToBlob } from "blob-util";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
`;

const Read = styled.div`
  font-size: 1.5rem;
  color: ${(props) => (props.read ? "green" : "red")};
  margin: 1rem 0 0 1rem;
`;
const PostContent = styled.div`
  font-size: 2rem;

  height: ${(props) => props.height || "auto"};

  margin: 3%;
`;

function Posts(props) {
  const postContent = useRef();
  const param = useParams();
  console.log(param);
  const { isRead, setRead } = useState(true);
  console.log(props);
  let url;
  if (props.profile_image) {
    const blob = base64StringToBlob(props.profile_image, "image/png");
    url = URL.createObjectURL(blob);
  }

  const data = { ...props, url };

  return (
    <Post {...props.style}>
      <PostHeader {...data}> </PostHeader> <hr style={{ margin: 0 }} />
      <Read read={isRead}>
        <b>
          <small>
            <FaBookmark /> {props.read}
          </small>
        </b>
      </Read>
      <PostContent
        height={props.style.height}
        ref={postContent}
        id={props.post_id}>
        <article> {props.post_content} </article>
      </PostContent>
      {!props.page ? <MainFooter /> : <SingleFooter id={props.post_id} />}
    </Post>
  );
}
export default Posts;
