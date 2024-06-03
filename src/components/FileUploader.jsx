import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const FileUploader = () => {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("files"); // manually register the file input
  }, [register]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Array.from(data.files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:3000/upload-multiple", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response error");
      }

      const urls = await response.json();
      console.log("Uploaded files:", urls);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Formulario</h1>
      <input
        type="file"
        name="files"
        multiple
        onChange={(e) => setValue("files", e.target.files)}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploader;
