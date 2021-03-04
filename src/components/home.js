import titleLogo from "../images/icon-left-font-monochrome-black.svg";
import Login from "./login";

function home() {
  return (
    <main>
      <div className="welcome">
        <div>
          <img className="title-image" src={titleLogo} alt="" />
          <h1>
            <b> welcome to Groupomania</b>
          </h1>
          <h2>connect-e's employee social network</h2>
        </div>
      </div>
      <Login />
    </main>
  );
}
export default home;
