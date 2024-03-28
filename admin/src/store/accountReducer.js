// action - state management
import {
  ADMIN_LOADED,
  AUTH_FAIL, 
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./actions";

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
  token: localStorage.getItem("exhibition_admin_token"),
  isAuthenticated: false,
  loading: true,
  admin: {},
};

// const accountReducer = (state = initialState, action) => {
export default function accountReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("exhibition_admin_token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };    
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("exhibition_admin_token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        admin: {}
      };
    case AUTH_FAIL:
      localStorage.removeItem("exhibition_admin_token");
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
