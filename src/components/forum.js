import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
function Forum() {
  const history = useHistory();
  const logout = () => {
    const cookie = new Cookies();
    cookie.remove("Authorization");
    history.push("/");
  };
  return (
    <div>
      <h1> logged in </h1>
      <button onClick={logout}>log out</button>
    </div>
  );
}
export default Forum;
