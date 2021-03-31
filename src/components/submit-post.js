import Button from "./styled-button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "./axios";
const SubmitPost = (props) => {
  const history = useHistory();
  const [error, setError] = useState();
  const submit = async () => {
    try {
      const cookie = new Cookies();
      console.log(props.value);
      if (props.value) {
        console.log(props.value);
        const response = await axios.post("/backend/createpost", props.value, {
          headers: {
            Authorization: cookie.get("Authorization"),
            headers: { "Content-Type": "multipart/form-data" },
          },
        });

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
    <>
      <small style={{ margin: "0" }} className="error">
        {error}
      </small>
      <br />
      <Button
        style={{ marginTop: "2%" }}
        className="create-post-button"
        onClick={submit}>
        create post
      </Button>
    </>
  );
};
export default SubmitPost;
