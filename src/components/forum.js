import Navbar from "./navbar";
import { useHistory } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Forum(props) {
  const history = useHistory();
  return (
    <div>
      <Navbar data={props} />
      <button
        onClick={() => history.push("/createpost")}
        className="create-post-button">
        <FaPlus className="plus-icon" /> create post
      </button>
    </div>
  );
}
export default Forum;
