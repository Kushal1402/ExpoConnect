import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Snackbar,
  CircularProgress,
  // Alert
} from "@mui/material";

import { Navigate, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { login } from "../../../../store/slices/userLoginAction";
import {
  setAlert,
  deleteAlert,
  deleteAllAlert,
} from "../../../../store/slices/alertAction";
import Alert from "ui-component/Alert/Alert";
// material-ui
import { useTheme } from "@mui/material/styles";
// third party
import { useFormik } from "formik";
import * as Yup from "yup";
import { Formik } from "formik";
// project imports

import AnimateButton from "ui-component/extended/AnimateButton";
// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";
// ============================|| REACT-NODE - LOGIN ||============================ //

const LoginAuth = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [checked, setChecked] = React.useState(true);
  const [loginLoading, setLoginLoading] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showLoginError, setShowLoginError] = React.useState("");

  const [disabledButton, setDisabledButton] = useState(false);

  const [loader, setLoader] = useState("");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = auth;

  const initialValues = {
    email: "admin@gmail.com",
    password: "123456",
  };

  const onSubmit = (values) => {
    // setLoginLoading(true);
    // let newData = {
    //   email: values.email,
    //   password: values.password,
    // };
    // setLoader(true);
    // setDisabledButton(true);
    // props
    //   .login(newData)
    //   .then((res) => {
    //     setDisabledButton(false);
    //     // console.log(res, 'inside .then')
    //     setLoginLoading(false);
    //     setLoader(false);
    //     // setOpen(true)
    //     // setMessage(res)
    navigate("/records", { replace: true });
    //   })
    //   .catch((err) => {
    //     setDisabledButton(false);
    //     // setShowLoginError(err.data.message)
    //     console.log(err, "err.response");
    //     // setOpen(true)
    //     dispatch(
    //       openSnackbar({
    //         open: true,
    //         message: err.response.data.message,
    //         variant: "alert",
    //         alert: {
    //           color: "error",
    //         },
    //         transition: "Fade",
    //         anchorOrigin: { vertical: "top", horizontal: "right" },
    //       })
    //     );
    //   });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email field is required"),
    password: Yup.string()
      .required("Password field is required")
      .min(6, "Must be 6 characters")
      .max(15, "Not more than 15 characters"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // if (isAuthenticated === true && loading === false) {
  //   return <Navigate replace to="/users" />;
  // }

  //snackbar close
  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false)
  // }

  // console.log(message, 'message')
  // console.log(open, 'open')
  return (
    <>
      {/* {open === true ?
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert autoHideDuration={4000} onClose={handleClose} severity="error" variant="filled">
            {message}
          </Alert>
        </Snackbar> : ""} */}

      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ pt: "6px !important" }}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Log in to your account</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Alert />
        </Grid>
      </Grid>

      <Formik>
        <form noValidate onSubmit={formik.handleSubmit}>
          <FormControl
            fullWidth
            error={Boolean(formik.touched.email && formik.errors.email)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-email-login">
              Email Address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              name="email"
              label="Email Address / Username"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography
                color="error"
                variant="caption"
                id="standard-weight-helper-text-password-login"
              >
                {formik.errors.email}
              </Typography>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(formik.touched.password && formik.errors.password)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-password-login">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              onBlur={formik.handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.password && formik.errors.password && (
              <Typography
                color="error"
                variant="caption"
                id="standard-weight-helper-text-password-login"
              >
                {formik.errors.password}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              {disabledButton === true ? (
                <Button
                  // disableElevation
                  // disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  // color="secondary"
                  sx={{ background: "#2196f3" }}
                  disabled
                >
                  {loader ? (
                    <CircularProgress
                      color="inherit"
                      variant="indeterminate"
                      size={26}
                    />
                  ) : (
                    "Login"
                  )}
                </Button>
              ) : (
                <Button
                  // disableElevation
                  // disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  // color="secondary"
                  sx={{ background: "#2196f3" }}
                >
                  {loader ? (
                    <CircularProgress
                      color="inherit"
                      variant="indeterminate"
                      size={26}
                    />
                  ) : (
                    "Login"
                  )}
                </Button>
              )}
            </AnimateButton>
          </Box>
        </form>
      </Formik>
    </>
  );
};

export default connect(null, {
  login,
  setAlert,
  deleteAlert,
  deleteAllAlert,
})(LoginAuth);
