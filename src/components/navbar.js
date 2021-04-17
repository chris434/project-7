import { useState, useEffect, useRef, useContext } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import titleLogo from "../images/icon-left-font-monochrome-black.svg";
import { FaUser, FaWpforms, FaPowerOff } from "react-icons/fa";
import userContext from "./context/userContext";

function Navbar(props) {
  const { pathname } = useLocation();
  const [open, setToggle] = useState("none");
  const dropDownRef = useRef();
  const profileImageRef = useRef();
  const user = useContext(userContext);
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
  const currentPage = (path) => {
    if (pathname === path) {
      return "none";
    }
    return "all";
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
    history.push("/login");
  };

  return (
    <div className="nav-bar-container">
      <header>
        <Link
          style={{ width: "100%", pointerEvents: currentPage("/") }}
          to={"/"}>
          <img className="logo" src={titleLogo} alt="" />
        </Link>

        <img
          ref={profileImageRef}
          className="profile-image"
          src={user.profile_image}
          alt=""
          onClick={dropDownState}
        />
      </header>
      <div>
        <section className="profile-dropdown">
          <ul ref={dropDownRef} style={{ display: open }}>
            <li>
              <Link
                to={"/delete_account"}
                style={{
                  color: "black",
                  pointerEvents: currentPage("/delete_account"),
                }}>
                <FaUser />
                {`${user.first_name} ${user.last_name}`}
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to={"/"}
                style={{
                  color: "black",
                  pointerEvents: currentPage("/"),
                }}>
                <FaWpforms />
                forum
              </Link>
            </li>
            <hr />
            <li onClick={logout}>
              <Link
                to={"/login"}
                style={{
                  color: "black",
                }}>
                <FaPowerOff />
                log out
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
export default Navbar;
