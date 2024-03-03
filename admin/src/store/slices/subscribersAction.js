import axios from "axios";
import { GET_ALL_USERS, GET_ACTIVE_TABLE_DATA } from "../actions";

const PROXY = process.env.REACT_APP_URL;

// Load User
export const getUsers =
  (page, limit, search) => async (dispatch) => {
    try {
      const res = await axios.get(
        `${PROXY}admin/user/list_users?page=${page}&limit=${limit}&search=${search}`
      );
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data.result,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const EditSingleUser = (data) => async (dispatch) => {
  const res = await axios.put(`${PROXY}admin/user/update_user`, data);
  return res;
};

export const UserDelete = (id) => async (dispatch) => {
  const res = await axios.delete(`${PROXY}admin/user/delete_user/${id}`);
  return res;
};

export const getActiveTableData = (id, page, limit) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${PROXY}admin/user/activeTable/${id}?page=${page}&limit=${limit}`
    );
    dispatch({
      type: GET_ACTIVE_TABLE_DATA,
      payload: res.data.result,
    });
    return res.data.result
  } catch (err) {
    console.error(err);
  }
};
