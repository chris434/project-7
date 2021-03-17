import axios from "./axios";
import Cookies from "universal-cookie";
import Navbar from "./navbar";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function CreatePost(props) {
  const history = useHistory();
  const [post, setPost] = useState({ value: "", length: 0 });
  const [error, setError] = useState();
  const updateLength = (e) => {
    const { value } = e.target;
    setPost({ value: value, length: value.length });
  };
  const submitPost = async () => {
    try {
      const cookie = new Cookies();
      if (post.value) {
        const response = await axios.post(
          "/backend/createpost",
          { data: post.value },
          {
            headers: {
              Authorization: cookie.get("Authorization"),
            },
          }
        );

        if (response.status === 200) {
          history.push("/forum");
        }
      } else {
        setError("field is required");
      }
    } catch {
      console.log("unable to submit post");
    }
  };

  return (
    <div>
      <div className="nav-bar">
        <Navbar {...props} />
      </div>

      <main style={{ flexDirection: "column", alignItems: "center" }}>
        <h1>create a post</h1>
        <section className="create-post-container">
          <div>
            <small style={{ float: "right", fontSize: "1.5rem" }}>
              {post.length}/255
            </small>
          </div>
          <textarea
            style={{ marginBottom: "2%" }}
            onChange={updateLength}
            maxLength="255"
            placeholder="what is on your mind?"
            className="post-textArea"></textarea>
          <small style={{ margin: "0" }} className="error">
            {error}
          </small>
          <br />
          <button
            style={{ marginTop: "2%" }}
            className="create-post-button"
            onClick={submitPost}>
            create post
          </button>
        </section>
      </main>
    </div>
  );
}
export default CreatePost;
