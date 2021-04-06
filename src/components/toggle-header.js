import styled from "styled-components";
import { useState } from "react";
import { FaPen, FaImage } from "react-icons/fa";
const Options = styled.section`
  ul {
    display: flex;
    margin: 0;
  }

  button {
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 1.5rem;
    padding: 1rem;

    width: auto;
    border-right: 1px black solid;
  }
  #post {
    color: ${(props) => (props.toggle ? "blue" : "black")};
    border-bottom: ${(props) =>
      props.toggle ? "blue 3px solid" : "transparent"};
  }
  #image {
    color: ${(props) => (!props.toggle ? "blue" : "black")};
    border-bottom: ${(props) =>
      !props.toggle ? "blue 3px solid" : "transparent"};
  }
  margin-bottom: 5%;
  @media (max-width: 500px) {
    button {
      font-size: 1rem;
    }
  }
`;

function ToggleHeader(props) {
  const [postOption, setPostOption] = useState(props.stateValue);
  const toggle = (e) => {
    console.log(postOption);
    if (e.target.id === "post") {
      setPostOption(true);
      return props.state(true);
    }
    setPostOption(false);
    props.state(false);
    console.log(props.state);
    console.log(props);
  };
  return (
    <div>
      <Options toggle={postOption}>
        <button id="post" onClick={toggle}>
          {props.icon[0]} {props.values[0]}
        </button>
        <button id="image" onClick={toggle}>
          {props.icon[1]} {props.values[1]}
        </button>

        <hr style={{ margin: 0 }} />
      </Options>
    </div>
  );
}
export default ToggleHeader;
