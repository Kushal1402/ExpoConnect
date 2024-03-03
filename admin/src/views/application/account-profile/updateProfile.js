import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// material-ui
import {
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  TextField,
  Grid,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  CircularProgress,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import MuiAutocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// Project import
import { updateAdminProfileData } from "store/slices/userLoginAction";
import { loadUser } from "store/slices/userLoginAction";
import MainCard from "ui-component/cards/MainCard";
import { checkEmptyValidation } from "Helpers/Validation";
// import { getAdmin } from 'store/slices/allAdminAction';

// import {
//     checkRequiredValidationWithMinMax,
//     checkEmailValidation,
// } from "src/Helper/checkValid.js"

import Cropper from "react-easy-crop";
// import getCroppedImg from 'views/forms/raffle-category/cropImage';

const BootstrapDialogTitle = ({ children, onClose, ...other }) => (
  <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
    {children}
    {onClose ? (
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    ) : null}
  </DialogTitle>
);

BootstrapDialogTitle.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const UpdateProfile = (props) => {
  const theme = useTheme();
  const auth = useSelector((state) => state.auth);
  const { admin } = auth;
  const navigate = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errMessageOpen, setErrMessageOpen] = useState(false);

  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [fileName, setFileName] = useState("");
  const [imagePreview, setPreview] = useState("");
  const [imagePreviewUrl, setUrl] = useState("");
  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   setId(admin?._id);
  //   setText(admin?.name);
  //   setEmail(admin?.email);
  //   setPreview(admin?.profile_picture);
  // }, [admin?._id, admin?.name, admin?.email, admin?.profile_picture]);

  //Error states
  const [fileErr, setFileErr] = useState("");
  const [error, setError] = useState({
    nameErr: "",
    emailErr: "",
  });

  // Button
  const [disabledButton, setDisabledButton] = useState(false);

  const handleClose = (event, reason) => {
    // props.close()
    setError({
      nameErr: "",
      emailErr: "",
      errorNumber: "",
      errorCode: "",
    });
    if (reason === "clickaway") {
      return;
    }
    setMessageOpen(false);
    setErrMessageOpen(false);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    let validationFlag = true;
    const imageSize = e.target.files[0].size / 1024 / 1024;
    if (e.target.files.length) {
      let file = e.target.files[0];

      if (
        !file.name.match(
          /\.(jpg|jpeg|png|gif|svg|svg+xml|JPG|JPEG|PNG|GIF|SVG|SVG+XML)$/
        )
      ) {
        validationFlag = false;

        setUrl("");
        setFileName("");
        setPreview("");
        // setCroppedImage("")
      }
      if (validationFlag) {
        setUrl(file);
        setFileName(file.name);
        // setcropImageModal(true)
        // setIconCropper(true)
        setPreview(URL.createObjectURL(e.target.files[0]));
      }

      if (!file) {
        validationFlag = false;
        setFileErr("Please select image.");
      } else if (
        !file.name.match(
          /\.(jpg|jpeg|png|gif|svg|svg+xml|JPG|JPEG|PNG|GIF|SVG|SVG+XML)$/
        )
      ) {
        validationFlag = false;
        // setcropImageModal(false)
        setPreview(auth?.login?.admin?.profile_pic);
        setFileErr("Please select valid image");
      } else if (imageSize > 2) {
        validationFlag = false;
        // setcropImageModal(false)
        setPreview(auth?.login?.admin?.profile_pic);
        setFileErr("Please select image size less then 2 MB");
      } else {
        setFileErr("");
      }
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    // setLoader(true);
    // const pattern =
    //   /^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-z0-9]+([a-z0-9]+)*(\.[a-z0-9]+([a-z0-9]+)*)*\.[a-z]{2,4}$/;

    // let textErr = "";
    // let emailErr = "";

    // textErr = checkEmptyValidation(text, "Name");
    // emailErr = checkEmptyValidation(email, "Email");

    // if (textErr || emailErr) {
    //   setError({
    //     nameErr: textErr,
    //     emailErr: emailErr,
    //   });
    // } else if (!pattern.test(email)) {
    //   setError({
    //     ...error,
    //     emailErr: "Enter valid email",
    //   });
    // } else if (!imagePreview) {
    //   setFileErr("Please select valid image");
    // } else {
    //   setError({
    //     nameErr: "",
    //     emailErr: "",
    //   });

    //   const formData = new FormData();

    //   formData.append("name", text);
    //   formData.append("email", email);
    //   formData.append("profile_picture", imagePreviewUrl);

    //   setDisabledButton(true);

    //   props
    //     .updateAdminProfileData(id, formData)
    //     .then((res) => {
    //       // props.getAdmin(id)
    //       setLoader(false);
    //       setDisabledButton(false);
    //       setMessageOpen(true);
    //       setMessage(res.data.message);
    //       props.loadUser();
    //       // navigate('/menu-category');
    //       // props.close()
    //     })
    //     .catch((err) => {
    //       setErrMessage(err?.response?.data?.message);
    //       setErrMessageOpen(true);
    //       setDisabledButton(false);
    //       setLoader(false);
    //       console.log(err, "error occured");
    //     });
    // }
  };

  return (
    <>
      {/* Message */}
      <Snackbar
        open={messageOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          autoHideDuration={2000}
          onClose={handleClose}
          severity="success"
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errMessageOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          autoHideDuration={2000}
          onClose={handleClose}
          severity="error"
          variant="filled"
        >
          {errMessage}
        </Alert>
      </Snackbar>

      <MainCard
        title={
          <Typography sx={{ color: "#616161", fontSize: "18px" }} variant="h5">
            Update Profile
          </Typography>
        }
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              error={Boolean(error.nameErr)}
            // sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="Name">Name</InputLabel>
              <OutlinedInput
                id="Name"
                autoComplete="off"
                name="Name"
                type="text"
                label="Name"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                value={text}
                inputProps={{ maxLength: "32" }}
              />
              {error.nameErr && (
                <Typography
                  component="p"
                  variant="caption"
                  color="error"
                  className="invalid-text "
                >
                  {error.nameErr}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              error={Boolean(error.emailErr)}
            // sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="Email">Email</InputLabel>
              <OutlinedInput
                id="Email"
                autoComplete="off"
                name="Email"
                type="text"
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              {/* {emailErr && (
                                <Typography component="p" variant='caption' color="error" className="invalid-text ">{emailErr}</Typography>
                            )} */}
              {error.emailErr && (
                <Typography
                  component="p"
                  variant="caption"
                  color="error"
                  className="invalid-text "
                >
                  {error.emailErr}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ mt: 1, color: "#616161" }}>
              Profile Picture
            </Typography>
            <TextField
              fullWidth
              type="file"
              inputProps={{ accept: "image/*" }}
              sx={{ mt: 0.5 }}
              variant="outlined"
              onChange={(e) => handleFileChange(e)}
              required
            />
            <Typography variant="body1" component="p" sx={{ mt: 0.5 }}>
              (Note: Only JPG,JPEG,PNG,GIF,SVG image type allowed)
            </Typography>
            {fileErr.length > 0 ? (
              <Typography
                component="p"
                variant="caption"
                sx={{ color: "red" }}
                className="invalid-text"
              >
                {fileErr}
              </Typography>
            ) : null}
          </Grid>
          {imagePreview && (
            <Grid item xs={12}>
              <img
                src={imagePreview}
                alt="adminpic"
                style={{ width: "100px", height: "auto" }}
              />
            </Grid>
          )}{" "}
        </Grid>

        {disabledButton === true ? (
          <Button
            size="smaill"
            type="submit"
            variant="contained"
            // color='secondary'
            sx={{
              background: "#2196F3",
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
            disabled
            onClick={(e) => {
              onSubmitForm(e);
            }}
          >
            {loader ? (
              <CircularProgress
                variant="indeterminate"
                color="inherit"
                size={24}
              />
            ) : (
              "Save"
            )}
          </Button>
        ) : (
          <Button
            size="smaill"
            type="submit"
            variant="contained"
            // color='secondary'
            sx={{
              background: "#2196F3",
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
            onClick={(e) => {
              onSubmitForm(e);
            }}
          >
            {loader ? (
              <CircularProgress
                variant="indeterminate"
                color="inherit"
                size={24}
              />
            ) : (
              "Save"
            )}
          </Button>
        )}
      </MainCard>
    </>
  );
};

export default connect(null, {
  updateAdminProfileData,
  loadUser,
  // getAdmin
})(UpdateProfile);
