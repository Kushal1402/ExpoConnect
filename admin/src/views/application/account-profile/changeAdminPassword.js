// React imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Formik } from "formik";

//MUI imports
import {
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Project imports
import MainCard from "ui-component/cards/MainCard";
import { useDispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";
import { changeAdminPassword } from "store/slices/userLoginAction";

const ChangeAdminPassword = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { admin } = auth;

  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [disabledButton, setDisabledButton] = useState(false);
  const [loader, setLoader] = useState(false);

  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const validate = (values) => {
    let errors = {};

    if (!values.old_password) {
      errors.old_password = "This field is required";
    } else if (values.old_password.length < 6) {
      errors.old_password = "Current passsword must be greater than 6 characters";
    } else if (values.old_password.length > 25) {
      errors.old_password = "Current passsword must be less then 25 characters";
    }

    if (!values.new_password) {
      errors.new_password = "This field is required";
    } else if (values.new_password.length < 6) {
      errors.new_password = "New password must be greater than 6 characters";
    } else if (values.new_password.length > 25) {
      errors.new_password = "New passsword must be less then 25 characters";
    }

    if (!values.confirm_password) {
      errors.confirm_password = "This field is required";
    } else if (values.confirm_password.length < 6) {
      errors.confirm_password = "Confirm password must be greater than 6 characters";
    } else if (values.confirm_password.length > 25) {
      errors.confirm_password = "Confirm passsword field must be less then 25 characters";
    } else if (values.new_password !== values.confirm_password) {
      errors.confirm_password = "Confirm password should be same as new password";
    } else if (values.new_password.length < 6 && values.confirm_password.length < 6) {
      errors.new_password = "New password must be greater than 6 characters";
      errors.confirm_password = "Confirm password must be greater than 6 characters";
    }

    return errors;
  };

  const onSubmit = (values) => {

    setLoader(true);
    let newData = {
      old_password: values.old_password,
      new_password: values.confirm_password,
    };
    setDisabledButton(true);
    props
      .changeAdminPassword(newData, admin?._id)
      .then((res) => {
        setDisabledButton(false);
        setLoader(false);
        dispatch(
          openSnackbar({
            open: true,
            message: res?.data?.message,
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
        setDisabledButton(false);
        setLoader(false);
        dispatch(
          openSnackbar({
            open: true,
            message: err?.response?.data?.message,
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
              Old Password <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              autoComplete="current-password"
              type={showOldPassword ? "text" : "password"}
              name="old_password"
              label="Old Password"
              onChange={formik.handleChange}
              value={formik.values.old_password}
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
              <Typography
                color="error"
                variant="caption"
                id="standard-weight-helper-text-password-login"
              >
                {formik.errors.old_password}
              </Typography>
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
              New Password <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              autoComplete="new-password"
              type={showNewPassword ? "text" : "password"}
              name="new_password"
              label="New Password"
              onChange={formik.handleChange}
              value={formik.values.new_password}
              error={
                formik.touched.new_password &&
                Boolean(formik.errors.new_password)
              }
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
              <Typography
                color="error"
                variant="caption"
                id="standard-weight-helper-text-password-login"
              >
                {formik.errors.new_password}
              </Typography>
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
              Confirm Password <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              label="Confirm Password"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
              error={
                formik.touched.confirm_password &&
                Boolean(formik.errors.confirm_password)
              }
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
              <Typography
                color="error"
                variant="caption"
                id="standard-weight-helper-text-password-login"
              >
                {formik.errors.confirm_password}
              </Typography>
            )}
          </FormControl>

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
        </form>
      </Formik>
    </MainCard>
  );
};

export default connect(null, {
  changeAdminPassword,
})(ChangeAdminPassword);
