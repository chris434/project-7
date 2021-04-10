import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "./axios";
import titleImage from "../images/icon-left-font-monochrome-black.svg";
import { FaCheck, FaTimes } from "react-icons/fa";
import login from "./loginFuction";
import Cookies from "universal-cookie";
import Button from "./styled-button";

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
    //create user
    await axios
      .post("/backend/signup", form)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.data.error === "email") {
          return setError((state) => ({
            ...state,
            email: error.response.data.details,
          }));
        }
        console.log("unable to create user");
      });
    //log in user
    await axios
      .post("/backend/login", { email: form.email, password: password })
      .then((res) => {
        const cookie = new Cookies();
        cookie.set("Authorization", `bearer ${res.data.token}`);
        history.push("/forum");
      })
      .catch((Error) => {
        console.log(Error.response);
      });
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
          <form>
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
            <Button onClick={ValidateData}>create account</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
export default SignUp;
