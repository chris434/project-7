import styled from "styled-components";

import { FaThumbsUp } from "react-icons/fa";

const LikeSection = styled.section`
  font-size: 2rem;
  padding: 0 2rem 0 2rem;
  margin-bottom: 5%;
  div {
    display: flex;
    align-items: center;
    * {
      margin-right: 1rem;
    }
  }
  img {
    width: 3rem;
    clip-path: circle();
  }
`;

function Likes(props) {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        {props.likes ? props.likes.length + " likes" : ""}
      </h2>
      {props.likes
        ? props.likes.map((like) => {
            return (
              <LikeSection>
                <div>
                  <FaThumbsUp color="blue"></FaThumbsUp>
                  <img src={like.profile_image} alt={like.first_name} />
                  <small>{like.first_name + " " + like.last_name}</small>
                </div>

                <hr />
              </LikeSection>
            );
          })
        : null}
    </div>
  );
}
export default Likes;
