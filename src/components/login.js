import { useState } from "react";
import { useHistory } from "react-router-dom";
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

    const response = await login(email, password);
    console.log(response);
    if (response && response.status === 200) {
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
          <form onSubmit={onSubmit}>
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
            <button className="login-button">Login</button>
          </form>
          <small className="or-style">or</small>
          <button onClick={singUp}>sign up</button>
        </div>
      </section>
    </div>
  );
}
export default Login;
