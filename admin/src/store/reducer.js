// third-party
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import snackbarReducer from "./slices/snackbar";
import menuReducer from "./slices/menu";
import accountReducer from "./accountReducer";
import alertReducer from "./alertReducer";
import recordReducer from "./recordReducer"
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  auth: persistReducer({
    key: "expoConnectPersist",
    storage,
    keyPrefix: "expoConnectPersist-",
  },accountReducer),
  snackbar: snackbarReducer,
  alert: alertReducer,
  menu: menuReducer,
  record: recordReducer,
});

export default reducer;
