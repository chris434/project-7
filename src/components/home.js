import titleLogo from "../images/icon-left-font-monochrome-black.svg";
import styled from "styled-components";
import Login from "./login";
const Container = styled.div`
  display: flex;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  margin-left: 5%;
  img {
    margin-top: 3rem;
  }
  h1 h2 {
    margin: 0px;
  }
  @media (max-width: 700px) {
    img {
      width: 70%;
    }
    h1 h2 {
      font-size: 1.5rem;
    }
  }
`;

function home() {
  document.title = "login";
  return (
    <main>
      <Container>
        <InfoContainer>
          <img className="title-image" src={titleLogo} alt="" />
          <h1>
            <b> welcome to Groupomania</b>
          </h1>
          <h2>connect-e's employee social network</h2>
        </InfoContainer>
        <Login />
      </Container>
    </main>
  );
}
export default home;
