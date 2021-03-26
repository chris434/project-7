import styled from "styled-components";
import { FaThumbsUp, FaComment } from "react-icons/fa";
const Section = styled.div`
  padding: 1rem;
  * {
    margin-right: 1rem;
  }
`;

function MainFooter() {
  return (
    <div>
      <Section>
        <small style={{ fontSize: "1.2rem" }}> 0 likes </small>
        <small style={{ fontSize: "1.2rem" }}> 0 comments </small>
      </Section>
      <hr />
      <Section>
        <FaThumbsUp color="grey" fontSize="1.5rem" />

        <FaComment color="grey" fontSize="1.5rem" />
      </Section>
    </div>
  );
}
export default MainFooter;
