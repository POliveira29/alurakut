import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {DropZone} from "./styles";

function MyDropzone() {
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setUploadedFiles(data.secure_url);
    });
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false,
  });

  return (
    <DropZone>
      <div {...getRootProps()} className={isDragActive ? "active" : null}>
        Arraste a imagem da sua comunidade aqui
      </div>
      <input {...getInputProps()} name="image" required />
    </DropZone>
  );
}

export default MyDropzone;
