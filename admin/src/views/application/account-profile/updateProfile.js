import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

// material-ui
import {
  Button,
  IconButton,
  Typography,
  Grid,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// Project import
import { loadUser, updateAdminProfileData } from "store/slices/userLoginAction";
import MainCard from "ui-component/cards/MainCard";
import { checkEmptyValidation } from "Helpers/Validation";

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
  const auth = useSelector((state) => state.auth);
  const { admin } = auth;

  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errMessageOpen, setErrMessageOpen] = useState(false);

  const [id, setId] = useState("");

  const [text, setText] = useState("");

  const [email, setEmail] = useState("");

  const [imagePreview, setPreview] = useState("");

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setId(admin?._id);
    setText(admin?.adminName);
    setEmail(admin?.email);
    setPreview(admin?.profilePic);
  }, [admin?._id, admin?.adminName, admin?.email, admin?.profilePic]);

  //Error states
  const [error, setError] = useState({
    nameErr: "",
    emailErr: "",
  });

  // Button
  const [disabledButton, setDisabledButton] = useState(false);

  const handleClose = (event, reason) => {
    setError({
      nameErr: "",
      emailErr: "",
    });
    if (reason === "clickaway") {
      return;
    }
    setMessageOpen(false);
    setErrMessageOpen(false);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const pattern =
      /^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-z0-9]+([a-z0-9]+)*(\.[a-z0-9]+([a-z0-9]+)*)*\.[a-z]{2,4}$/;

    let textErr = "";
    let emailErr = "";

    textErr = checkEmptyValidation(text ? text.trim() : "", "Name");
    emailErr = checkEmptyValidation(email ? email.trim() : "", "Email");

    if (textErr || emailErr) {
      setError({
        nameErr: textErr,
        emailErr: emailErr,
      });
    } else if (!pattern.test(email)) {
      setError({
        ...error,
        emailErr: "Enter valid email",
      });
    } else {
      setError({
        nameErr: "",
        emailErr: "",
      });

      const updateObj = {
        name: text,
        email: email
      };

      setDisabledButton(true);
      setLoader(true);

      props
        .updateAdminProfileData(id, updateObj)
        .then((res) => {
          // props.getAdmin(id)
          setLoader(false);
          setDisabledButton(false);
          setMessageOpen(true);
          setMessage(res.data.message);
          props.loadUser();
        }).catch((err) => {
          setErrMessage(err?.response?.data?.message);
          setErrMessageOpen(true);
          setDisabledButton(false);
          setLoader(false);
          console.log(err, "error occured");
        });
    }
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
            >
              <InputLabel htmlFor="Name">Name <span style={{ color: "red" }}>*</span></InputLabel>
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
            >
              <InputLabel htmlFor="Email">Email <span style={{ color: "red" }}>*</span></InputLabel>
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
            {imagePreview && (
              <img
                src={imagePreview}
                alt="adminpic"
                style={{ width: "100px", height: "auto" }}
              />
            )}
          </Grid>
        </Grid>

        <Button
          size="smaill"
          type="submit"
          variant="contained"
          sx={{
            background: "#025DBF",
            "&:hover": { background: "#025DBF" },
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
          onClick={(e) => {
            onSubmitForm(e);
          }}
          disabled={disabledButton === true ? true : false}
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
      </MainCard>
    </>
  );
};

export default connect(null, {
  updateAdminProfileData,
  loadUser,
})(UpdateProfile);
