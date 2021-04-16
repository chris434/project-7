import styled from "styled-components";

const Button = styled.button`
  width: 60%;
  font-size: 2rem;
  margin: 5% 0% 5% 0%;
  background-color: ${(props) =>
    props.color ? props.color : "rgb(74, 133, 16)"};
  opacity: ${(props) => (props.state ? 0.8 : 1)};
  color: white;
  padding: 2%;
  cursor: pointer;
  outline: none;
  border: none;
  text-align: center;
  :hover {
    background-color: ${(props) =>
      props.hover ? props.hover : "rgb(105, 182, 27)"};
  }
  @media (max-width: 400px) {
    width: 80%;
  }
`;

export default Button;
