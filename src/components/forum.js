import { useHistory } from "react-router-dom";
function Forum() {
  const history = useHistory();
  const logout = () => {
    const header = new Headers();
    header.delete("Authorization");
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
