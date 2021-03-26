import styled from "styled-components";

const Button = styled.button`
  font-size: 2rem;
  margin: 5% 20% 5% 20%;
  background-color: ${(props) =>
    props.color ? props.color : "rgb(74, 133, 16)"};
  color: white;
  padding: 2%;
  width: 50%;
  cursor: pointer;
  outline: none;
  border: none;
  text-align: center;
  :hover {
    background-color: ${(props) =>
      props.hover ? props.hover : "rgb(105, 182, 27)"};
  }
`;
export default Button;
