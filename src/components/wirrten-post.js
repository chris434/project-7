import { useState } from "react";
import SubmitPost from "./submit-post";

const WrittenPost = () => {
  const [post, setPost] = useState({ value: "", length: 0 });

  const update = (e) => {
    const { value } = e.target;

    setPost({
      data: { value: value, field: "text" },
      length: value.length,
    });
  };
  return (
    <>
      <div>
        <small style={{ float: "right", fontSize: "1.5rem" }}>
          {post.length}/255
        </small>
      </div>
      <textarea
        style={{ marginBottom: "2%" }}
        onChange={update}
        maxLength="255"
        placeholder="what is on your mind?"
        className="post-textArea"></textarea>
      <SubmitPost value={post.data}></SubmitPost>
    </>
  );
};
export default WrittenPost;
