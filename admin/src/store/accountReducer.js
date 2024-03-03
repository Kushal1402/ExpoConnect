// action - state management
import {
  ADMIN_LOADED,
  AUTH_FAIL,
  LOGIN_SUB_ADMIN_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./actions";

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  admin: {},
};

// const accountReducer = (state = initialState, action) => {
export default function accountReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUB_ADMIN_SUCCESS:
      localStorage.setItem("role", payload.role);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload,
      };
    case ADMIN_LOADED:
      localStorage.setItem("role", payload.role);

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

// export default accountReducer;
