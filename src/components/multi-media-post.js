import { useState } from "react";

import { FaUpload } from "react-icons/fa";
import styled from "styled-components";
import SubmitPost from "./submit-post";

const UploadContainer = styled.div`
  width: 100%;
  height: 30vh;
  border: gray 3px dashed;
`;
const Info = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  p {
    vertical-align: middle;
  }
`;
const Preview = styled.img`
  width: 50%;
  position: relative;
  z-index: 1;
  margin: 5%;
  object-fit: fill;
  overflow: hidden;
`;

const ImageContainer = styled.section`
  width: 70%;
  align-items: center;
  label {
    font-size: 1rem;
    padding: 1rem;
    margin-left: 1rem;
    background-color: blue;
    color: white;
  }
`;

function Previews(props) {
  const [hasImage, setHasImage] = useState({
    label: "file-upLoader",
    UploadState: "block",
    PreviewState: "none",
  });
  const [image, setImage] = useState({ urlImage: null, image: null });

  const changeImage = (e) => {
    setHasImage({ label: "", UploadState: "none", PreviewState: "flex" });

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
      image: form,
      urlImage: url,
    });
  };

  return (
    <>
      <label htmlFor={hasImage.label}>
        <UploadContainer>
          <Info style={{ display: hasImage.UploadState }}>
            <p>
              <FaUpload fontSize="2rem" />
              <br />
              click upload image
            </p>
          </Info>
          <ImageContainer style={{ display: hasImage.PreviewState }}>
            <Preview src={image.urlImage}></Preview>
            <label htmlFor="file-upLoader">change Image</label>
          </ImageContainer>
        </UploadContainer>
      </label>
      <input
        onChange={changeImage}
        type="file"
        name=""
        id="file-upLoader"
        style={{ display: "none" }}
      />
      <SubmitPost value={image.image}></SubmitPost>
    </>
  );
}

export default Previews;
