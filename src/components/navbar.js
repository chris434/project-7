import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import titleLogo from "../images/icon-left-font-monochrome-black.svg";
import { base64StringToBlob } from "blob-util";
import { FaUser, FaCog, FaPowerOff, FaPlus } from "react-icons/fa";

function Navbar(props) {
  const [open, setToggle] = useState("none");
  const dropDownRef = useRef();
  const profileImageRef = useRef();
  const history = useHistory();
  let url;

  if (props.data.image) {
    const blob = base64StringToBlob(props.data.image, "image/png");
    url = URL.createObjectURL(blob);
  }
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
          src={url}
          alt=""
          onClick={dropDownState}
        />
      </header>
      <div>
        <section className="profile-dropdown">
          <ul ref={dropDownRef} style={{ display: open }}>
            <li>
              <FaUser />
              {`${props.data.firstName} ${props.data.lastName}`}
              <hr />
            </li>
            <li>
              <FaCog />
              your account
              <hr />
            </li>
            <li onClick={logout}>
              <FaPowerOff />
              log out
            </li>
          </ul>
        </section>
        <button className="create-post-button">
          <FaPlus className="plus-icon" />
          create post
        </button>
      </div>
    </div>
  );
}
export default Navbar;
