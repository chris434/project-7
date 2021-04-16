import { useState } from "react";
import Button from "./styled-button";
import styled from "styled-components";
import axios from "./axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 60%;
  margin-top: 3rem;
  margin: 3rem;
  padding: 2rem;
  background-color: white;
  box-shadow: 10px 20px gray;
  input {
    width: 50%;
    font-size: 2rem;
  }
  label {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    width: 80%;
    padding: 2rem;
    input {
      width: 80%;
    }
  }
`;
function Delete() {
  const history = useHistory();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const updatePasswordValue = (e) => {
    setPassword(e.target.value);
  };
  const deleteAccount = async () => {
    const cookie = new Cookies();
    try {
      if (!password) return setError("enter password");
      await axios.delete(`/backend/delete-account`, {
        data: {
          password: password,
        },
        headers: {
          Authorization: cookie.get("Authorization"),
        },
      });
      cookie.remove("Authorization");
      history.push("/");
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <div className={"flex-container"}>
      <Container className={"flex-container"}>
        <h1>delete account</h1>
        <label htmlFor="password">confirm password</label>
        <input onChange={updatePasswordValue} type="password" />
        <small className={"error"}>{error}</small>
        <Button onClick={deleteAccount} color={"red"} hover={"brickRed"}>
          delete
        </Button>
      </Container>
    </div>
  );
}
export default Delete;
