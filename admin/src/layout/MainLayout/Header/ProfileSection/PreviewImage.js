import React, { useState } from "react";
import { Grid } from "@mui/material";
const PreviewImage = ({ file }) => {
  const [preview, setPreview] = React.useState(null);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };
  return (
    <Grid>
      {preview ? (
        <img src={preview} alt="preview" width="150px" height="150px" />
      ) : (
        "loading"
      )}
    </Grid>
  );
};

export default PreviewImage;
