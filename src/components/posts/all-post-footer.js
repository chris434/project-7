import styled from "styled-components";
import axios from "../axios";
import Cookies from "universal-cookie";
import { useState } from "react";

import { FaThumbsUp, FaComment } from "react-icons/fa";
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

function MainFooter(props) {
  console.log(props);
  const [like, setLike] = useState({
    count: props.like_count,
    color: props.liked,
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
        <small style={{ fontSize: "1.2rem" }}> {like.count} likes </small>
        <small style={{ fontSize: "1.2rem" }}> 0 comments </small>
      </Section>
      <hr />
      <Section liked={like.color}>
        <FaThumbsUp onClick={() => postLike(props.post_id)} fontSize="1.5rem" />

        <FaComment color="grey" fontSize="1.5rem" />
      </Section>
    </div>
  );
}
export default MainFooter;
