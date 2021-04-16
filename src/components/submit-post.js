import Button from "./styled-button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "./axios";
import { FaSpinner } from "react-icons/fa";

const SubmitPost = (props) => {
  const history = useHistory();
  const [error, setError] = useState();
  const [loading, setLoading] = useState({ style: "none", state: false });
  const submit = async () => {
    try {
      const cookie = new Cookies();
      console.log(props);
      if (props.data.value || props.isTrue) {
        setLoading({ style: "block", state: true });

        const response = await axios.post("/backend/createpost", props.data, {
          headers: {
            Authorization: cookie.get("Authorization"),
            headers: { "Content-Type": "multipart/form-data" },
          },
        });

        if (response.status === 200) {
          history.push("/");
        }
      } else {
        setLoading({ style: "none", state: false });
        setError("field is required");
      }
    } catch {
      setLoading({ style: "none", state: false });
      console.log("unable to submit post");
    }
  };
  return (
    <>
      <small style={{ margin: "0" }} className="error">
        {error}
      </small>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}>
        <Button
          style={{ marginTop: "2%" }}
          disabled={loading.state}
          state={loading.state}
          className="create-post-button"
          onClick={submit}>
          create post
        </Button>
        <FaSpinner
          style={{ display: loading.style }}
          className="spin"
          color={"blue"}
          fontSize={"2.5rem"}></FaSpinner>
      </div>
    </>
  );
};
export default SubmitPost;
