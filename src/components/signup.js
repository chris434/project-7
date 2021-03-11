import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { axios } from "./axios";

import titleImage from "../images/icon-left-font-monochrome-black.svg";
import { FaCheck, FaTimes } from "react-icons/fa";
import login from "./loginFuction";

function SignUp() {
  const [state, setState] = useState({
    case0: { color: "red", icon: <FaTimes /> },
    case1: { color: "red", icon: <FaTimes /> },
    case2: { color: "red", icon: <FaTimes /> },
    case3: { color: "red", icon: <FaTimes /> },
  });
  const [password, setPassword] = useState("");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [errors, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const history = useHistory();
  const states = [
    ["green", <FaCheck />],
    ["red", <FaTimes />],
  ];

  const ValidatePassword = (e) => {
    const password = e.target.value;
    const conditions = [/(?=.*\d)/, /(?=.*[A-Z])/, /(?=.*[@$!%*#?&])/];
    setPassword(password);
    conditions.forEach((regx, index) => {
      if (regx.test(password)) return changeState(`case${index}`, states[0]);
      changeState(`case${index}`, states[1]);
    });

    if (password.length >= 8) return changeState("case3", states[0]);
    changeState("case3", states[1]);
  };

  const changeState = (name, [color, icon]) => {
    setState((state) => ({
      ...state,
      [name]: { color, icon },
    }));
  };
  const dataOnChange = (e) => {
    const { value, name } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const postData = async () => {
    const form = { ...data, password };
    try {
      const response = await axios.post("/backend/signup", form);
      if (response.data.error === "email") {
        return setError((state) => ({
          ...state,
          email: response.data.details,
        }));
      }

      const loggedIn = await login(data.email, password);
      if (loggedIn.status === 200) {
        return history.push("/forum");
      }
    } catch {
      console.log("unable to create user");
    }
  };
  const ValidateData = (e) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let isValid = true;
    e.preventDefault();

    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      let error = "";
      if (!value) {
        error = `${key.replace("_", " ")} is required`;
        isValid = false;
      } else if (key === "email" && !emailRegex.test(value)) {
        isValid = false;
        error = "not valid email";
      }
      setError((state) => ({
        ...state,
        [key]: error,
      }));
    });

    if (!passwordRegx.test(password) || !isValid) {
      return window.scrollTo(0, 0);
    }
    postData();
  };

  return (
    <div>
      <main>
        <div className="signup-container">
          <img className="title-image" src={titleImage} alt="" />
          <h1>create an account with Groupomania </h1>
          <small className="question">
            already have an account? <Link to="/">go to login</Link>
          </small>
          <form onSubmit={ValidateData}>
            <div>
              <small className="required">* </small>
              <input
                name="first_name"
                value={data.firstName}
                onChange={dataOnChange}
                type="text"
                placeholder="first name"
              />
              <br /> <small className="error">{errors.first_name}</small>
            </div>
            <div>
              <small className="required">* </small>
              <input
                name="last_name"
                value={data.lastName}
                onChange={dataOnChange}
                type="text"
                placeholder="last name"
              />
              <br /> <small className="error">{errors.last_name}</small>
            </div>
            <div>
              <small className="required">* </small>
              <input
                name="email"
                value={data.email}
                onChange={dataOnChange}
                type="text"
                placeholder="email"
              />
              <br /> <small className="error">{errors.email}</small>
            </div>
            <div>
              <small className="required">* </small>
              <input
                onChange={ValidatePassword}
                type="password"
                placeholder="password"
              />
            </div>
            <section className="password-requirement-container">
              <ul>
                <li style={{ color: state.case0.color }}>
                  <b>{state.case0.icon} password must contain one number</b>
                </li>
                <li style={{ color: state.case1.color }}>
                  <b>
                    {state.case1.icon} password must contain one uppercase
                    character
                  </b>
                </li>
                <li style={{ color: state.case2.color }}>
                  <b>
                    {state.case2.icon} password must contain one special
                    character
                  </b>
                </li>
                <li style={{ color: state.case3.color }}>
                  <b>{state.case3.icon} password length be 8 characters long</b>
                </li>
              </ul>
            </section>
            <hr />
            <button>create account</button>
          </form>
        </div>
      </main>
    </div>
  );
}
export default SignUp;