import styled from "styled-components";
import axios from "../axios";
import Cookies from "universal-cookie";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PostContext from "../context/post-context.js";

import { FaComment, FaThumbsUp } from "react-icons/fa";

const Section = styled.div`
  padding: 1rem;
  svg {
    color: ${(props) => (props.liked ? "#5e84f1" : "grey")};
  }
  svg:hover {
    cursor: pointer;
  }
  * {
    margin-right: 1rem;
  }
`;

function MainFooter() {
  const post = useContext(PostContext);
  const [like, setLike] = useState({
    count: post.like_count,
    color: post.liked,
  });

  const postLike = async (post_id) => {
    const cookie = new Cookies();
    try {
      const response = await axios.post(
        `/backend/like/${post_id}`,
        {},
        {
          headers: {
            Authorization: cookie.get("Authorization"),
          },
        }
      );
      let current = like.count;
      let color = like.color ? false : true;
      console.log(color);

      setLike({ count: (current += response.data.count), color: color });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Section>
        <Link
          to={{
            pathname: `post/${post.post_id}`,
            state: { content: true, scroll: true },
          }}
          style={{ fontSize: "1.2rem" }}>
          {like.count} likes
        </Link>

        <Link
          to={{
            pathname: `post/${post.post_id}`,
            state: { content: false, scroll: true },
          }}
          style={{ fontSize: "1.2rem" }}>
          {post.comment_count} comments
        </Link>
      </Section>
      <hr />
      <Section liked={like.color}>
        <FaThumbsUp onClick={() => postLike(post.post_id)} fontSize="1.5rem" />
        <Link
          to={{
            pathname: `/post/${post.post_id}`,
            state: { content: false, scroll: true, focus: true },
          }}>
          <FaComment color="grey" fontSize="1.5rem" />
        </Link>
      </Section>
    </div>
  );
}
export default MainFooter;
