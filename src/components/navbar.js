import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import titleLogo from "../images/icon-left-font-monochrome-black.svg";
import { FaUser, FaCog, FaPowerOff } from "react-icons/fa";

function Navbar(props) {
  console.log(props);
  const [open, setToggle] = useState("none");
  const dropDownRef = useRef();
  const profileImageRef = useRef();
  const history = useHistory();
  console.log(props);

  const keyDown = (e) => {
    if (
      !dropDownRef.current.contains(e.target) &&
      !profileImageRef.current.contains(e.target)
    ) {
      setToggle("none");
    }
  };
  useEffect(() => {
    window.addEventListener("mousedown", keyDown);
    return () => {
      window.removeEventListener("mousedown", keyDown);
    };
  }, []);
  const dropDownState = () => {
    if (open === "block") {
      return setToggle("none");
    }
    setToggle("block");
  };
  const logout = () => {
    const cookie = new Cookies();
    cookie.remove("Authorization");
    history.push("/");
  };

  return (
    <div className="nav-bar-container">
      <header>
        <img className="logo" src={titleLogo} alt="" />

        <img
          ref={profileImageRef}
          className="profile-image"
          src={props.profile_image}
          alt=""
          onClick={dropDownState}
        />
      </header>
      <div>
        <section className="profile-dropdown">
          <ul ref={dropDownRef} style={{ display: open }}>
            <li onClick={() => history.push("/delete_account")}>
              <FaUser />
              {`${props.first_name} ${props.last_name}`}
            </li>
            <hr />
            <li>
              <FaCog />
              your account
            </li>
            <hr />
            <li onClick={logout}>
              <FaPowerOff />
              log out
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
export default Navbar;
