import { useState } from "react";

import { FaUpload } from "react-icons/fa";
import styled from "styled-components";
import SubmitPost from "./submit-post";

const UploadContainer = styled.div`
  width: 100%;
  border: gray 3px dashed;
  position: relative;
  padding: 10% 0 10% 0;
`;
const Upload = styled.div`
  display: ${(props) => (props.state ? "flex" : "none")};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  label {
    font-size: 1rem;
    padding: 1rem;
    background-color: blue;
    color: white;
  }
`;
const Info = styled.div`
  width: 100%;
  height: 30vh;
  display: ${(props) => (!props.state ? "flex" : "none")};
  justify-content: center;
  flex-direction: column;
  text-align: center;
  p {
    vertical-align: middle;
  }
`;
const Preview = styled.img`
  width: 50%;
  z-index: 1;
  margin-bottom: 5%;
  object-fit: fill;
  overflow: hidden;

  @media (max-width: 400px) {
    width: 100%;
  }
`;

function Previews() {
  const [hasImage, setHasImage] = useState({
    label: "file-upLoader",
    UploadState: false,
  });
  const [image, setImage] = useState({ value: "" });

  const changeImage = (e) => {
    setHasImage({ label: "", UploadState: true });

    let url = image.urlImage;
    let postImage = image.image;

    if (e.target.files[0]) {
      postImage = e.target.files[0];
      url = URL.createObjectURL(e.target.files[0]);
    }
    const form = new FormData();
    form.append("image", postImage);
    form.append("field", "image");

    setImage({
      value: form,
      urlImage: url,
    });
  };

  return (
    <>
      <label htmlFor={hasImage.label}>
        <UploadContainer>
          <Info state={hasImage.UploadState}>
            <p>
              <FaUpload fontSize="2rem" />
              <br />
              click upload image
            </p>
          </Info>
          <Upload state={hasImage.UploadState}>
            <Preview src={image.urlImage}></Preview>

            <label state={hasImage.UploadState} htmlFor="file-upLoader">
              change Image
            </label>
          </Upload>
        </UploadContainer>
      </label>
      <input
        onChange={changeImage}
        type="file"
        name=""
        accept="image/*"
        id="file-upLoader"
        style={{ display: "none" }}
      />

      <SubmitPost data={image.value} isTrue={true}></SubmitPost>
    </>
  );
}

export default Previews;
