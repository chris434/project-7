import titleLogo from "../images/icon-left-font-monochrome-black.svg";

import { useLocation, Link } from "react-router-dom";
function NoResult(props) {
  document.title = "404";
  const { pathname } = useLocation();
  return (
    <main className={"flex-container can-not-be-found-container"}>
      {!props.type ? (
        <img className={"image-404"} src={titleLogo} alt="groupomania" />
      ) : (
        ""
      )}

      <h1> 404 page cant be found </h1>
      <p>
        sorry the page <b>http://localhost:3000/{pathname}</b> could not be
        found
      </p>
      <Link style={{ fontSize: "1.5rem" }} to={"/"}>
        go to forum
      </Link>
    </main>
  );
}
export default NoResult;
