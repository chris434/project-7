import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "./axios";
import Cookies from "universal-cookie";
import Button from "./styled-button";

import login from "./loginFuction";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const history = useHistory();

  const onchange = (e) => {
    const { value, name } = e.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("sub");
    const { email, password } = form;
    if (email === "" || password === "") {
      return setError("email and password required");
    }
    console.log("k");
    const response = await axios.post("/backend/login", {
      email: email,
      password: password,
    });
    console.log("j");
    const cookie = new Cookies();
    cookie.set("Authorization", `bearer ${response.data.token}`);
    console.log(cookie.get("Authorization"));
    if (response && response.status === 200) {
      console.log(cookie.get("Authorization"));
      return history.push("/forum");
    } else if (response) {
      setError(response.data.error);
    }
  };
  const singUp = () => {
    history.push("/signup");
  };

  return (
    <div>
      <section className="login-container">
        <div className="login">
          <h1>
            <b>Login to Groupomania</b>
          </h1>
          <form>
            <input
              name="email"
              value={form.email}
              onChange={onchange}
              type="email"
              placeholder="email"
            />
            <input
              name="password"
              value={form.password}
              onChange={onchange}
              type="password"
              placeholder="password"
            />
            <p className="error">{error}</p>
            <Button
              onClick={onSubmit}
              color={"blue"}
              hover={"rgb(16, 16, 207)"}
              className="login-button">
              Login
            </Button>
          </form>
          <small className="or-style">or</small>
          <Button onClick={singUp}>sign up</Button>
        </div>
      </section>
    </div>
  );
}
export default Login;
