// third-party
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import snackbarReducer from "./slices/snackbar";
import cartReducer from "./slices/cart";
import menuReducer from "./slices/menu";
import accountReducer from "./accountReducer";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import subscriberReducer from "./subscriberReducer";
import recordReducer from "./recordReducer"
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  auth: accountReducer,
  userAll: userReducer,
  snackbar: snackbarReducer,
  cart: persistReducer(
    {
      key: "cart",
      storage,
      keyPrefix: "berry-",
    },
    cartReducer
  ),
  menu: menuReducer,
  alert: alertReducer,
  subscriber: subscriberReducer,
  record: recordReducer,
});

export default reducer;
