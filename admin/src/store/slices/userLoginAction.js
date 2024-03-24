import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  ADMIN_LOADED,
  AUTH_FAIL,
  LOGIN_SUB_ADMIN_SUCCESS,
} from "../actions";
import { setAlert } from "./alertAction";
import { useDispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";
import setAuthToken from "../../Helpers/setAuthToken";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const PROXY = process.env.REACT_APP_URL;
export const login = (userObj) => async (dispatch) => {
  try {
    const body = JSON.stringify(userObj);

    const res = await axios.post(PROXY + "admin/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    if (error.response) {
      dispatch(setAlert(error.response.data.message, "danger"));
      return error.response.data.message;
    } else {
      dispatch(setAlert("Error occurred, Please try again later", "danger"));
    }
    return error;
  }
};

// Load User
export const loadUser = (data) => async (dispatch) => {
  if (localStorage.exhibition_admin_token) {
    setAuthToken(localStorage.exhibition_admin_token);
  }
  try {
    const body = JSON.stringify(data);
    const res = await axios.get(PROXY + "admin/auth", body, config);

    dispatch({
      type: LOGIN_SUB_ADMIN_SUCCESS,
      payload: res.data.result,
    });
    return res.data.result;
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  dispatch(
    openSnackbar({
      open: true,
      message: "Logout Successfully",
      variant: "alert",
      alert: {
        color: "success",
      },
      transition: "Fade",
      anchorOrigin: { vertical: "top", horizontal: "right" },
    })
  );
};

export const changeAdminPassword = (data, id) => async (dispatch) => {
  const body = JSON.stringify(data);
  const res = await axios.post(`${PROXY}admin/changePassword`, body, config);
  return res;
};

export const updateAdminProfileData = (id, formData) => async (dispatch) => {
  const res = await axios.put(`${PROXY}admin/updateProfile`, formData, config);
  return res;
};

export const changePassword = (objPassword) => async (dispatch) => {
  const body = JSON.stringify(objPassword);

  const res = await axios.put(
    PROXY + "admin/change-password/" + objPassword.id,
    body,
    config
  );
  dispatch(openSnackbar(res.data.message, "success"));
  return res;
};

export const updateProfile = (id, formData) => async (dispatch) => {
  return await axios.put(PROXY + "admin/update-profile", formData);
};
