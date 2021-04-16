import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "./axios";
import Cookies from "universal-cookie";
import Button from "./styled-button";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const history = useHistory();
  const { state } = useLocation();
  console.log(state);

  const onchange = (e) => {
    const { value, name } = e.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("sub");
    const { email, password } = form;
    if (email === "" || password === "") {
      return setError("email and password required");
    }
    axios
      .post("/backend/login", { email: email, password: password })
      .then((res) => {
        const cookie = new Cookies();
        cookie.set("Authorization", `bearer ${res.data.token}`);
        const path = state ? state : "/";
        history.push(path);
      })
      .catch((Error) => {
        setError(Error.response.data);
      });
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
              hover={"rgb(16, 16, 207)"}>
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
