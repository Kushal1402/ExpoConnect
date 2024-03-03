import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useFormik } from "formik";
import { Formik } from "formik";
import { useTheme } from "@mui/material/styles";
import { connect, useSelector } from "react-redux";
import MainCard from "ui-component/cards/MainCard";

import {
  changePassword,
  loadUser,
} from "../../../../store/slices/userLoginAction";
import { useDispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePassword = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);

  const auth = useSelector((state) => state.auth);
  const { admin, loading } = auth;

  useEffect(() => {
    props.loadUser();
  }, []);

  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
    // passID:id,
  };

  const validate = (values) => {
    let errors = {};

    if (!values.old_password) {
      errors.old_password = "Old Password Field is Required";
    }
    if (!values.new_password) {
      errors.new_password = "New Password Field is Required";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirm Password Field is Required";
    }

    if (values.new_password !== values.confirm_password) {
      errors.new_password = "New Password Not Match";
      errors.confirm_password = "Confirm Password Not Match";
    }

    return errors;
  };

  const onSubmit = (values) => {
    let newData = {
      old_password: values.old_password,
      new_password: values.new_password,
      id: admin._id,
    };

    props
      .changePassword(newData)
      .then((res) => {
        dispatch(
          openSnackbar({
            open: true,
            message: res.data.message,
            variant: "alert",
            alert: {
              color: "success",
            },
            transition: "Fade",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          })
        );
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            open: true,
            message: err.response.data.message,
            variant: "alert",
            alert: {
              color: "error",
            },
            transition: "Fade",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          })
        );
      });
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <MainCard
      title={
        <Typography sx={{ color: "#616161", fontSize: "18px" }} variant="h5">
          Change Password
        </Typography>
      }
    >
      <Formik>
        <form noValidate onSubmit={formik.handleSubmit}>
          <FormControl
            fullWidth
            error={Boolean(
              formik.touched.old_password && formik.errors.old_password
            )}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-password-login">
              Old Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showOldPassword ? "text" : "password"}
              name="old_password"
              label="Old Password"
              onChange={formik.handleChange}
              value={formik.values.old_password}
              error={
                formik.touched.old_password &&
                Boolean(formik.errors.old_password)
              }
              // onBlur={formik.handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.old_password && formik.errors.old_password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {formik.errors.old_password}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(
              formik.touched.new_password && formik.errors.new_password
            )}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-password-login">
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showNewPassword ? "text" : "password"}
              name="new_password"
              label="New Password"
              onChange={formik.handleChange}
              value={formik.values.new_password}
              error={
                formik.touched.new_password &&
                Boolean(formik.errors.new_password)
              }
              // onBlur={formik.handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.new_password && formik.errors.new_password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {formik.errors.new_password}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(
              formik.touched.confirm_password && formik.errors.confirm_password
            )}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-password-login">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              label="Confirm Password"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
              error={
                formik.touched.confirm_password &&
                Boolean(formik.errors.confirm_password)
              }
              // onBlur={formik.handleBlur}
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
            {formik.touched.confirm_password && formik.errors.confirm_password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {formik.errors.confirm_password}
              </FormHelperText>
            )}
          </FormControl>

          {/* <Box sx={{ mt: 2 }}>
            <AnimateButton> */}
          {/* <Link to="/users"> */}
          <Button
            // disableElevation
            // disabled={isSubmitting}
            // fullWidth
            size="smaill"
            type="submit"
            variant="contained"
            color="secondary"
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
            sx={{ mt: 2 }}
          >
            Update
          </Button>
          {/* </Link> */}
          {/* </AnimateButton>
          </Box> */}
        </form>
      </Formik>
    </MainCard>
  );
};

export default connect(null, {
  changePassword,
  loadUser,
})(ChangePassword);
