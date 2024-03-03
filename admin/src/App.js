import React, { useState, useEffect } from "react";
// routing
import Routes from "routes";

// project imports
import Locales from "ui-component/Locales";
import NavigationScroll from "layout/NavigationScroll";
import RTLLayout from "ui-component/RTLLayout";
import Snackbar from "ui-component/extended/Snackbar";
import ThemeCustomization from "themes";
// import store from "./store/index"
import { loadUser } from "./store/slices/userLoginAction";
import { store } from "store";
import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import "react-datepicker/dist/react-datepicker.css";

// auth provider
// import { FirebaseProvider as AuthProvider } from "contexts/FirebaseContext";
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, [loadUser]);
  return (
    <ThemeCustomization store={store}>
      {/* RTL layout */}
      <RTLLayout>
        <Locales>
          <NavigationScroll>
            {/* <AuthProvider> */}
            <>
              <Routes />
              <Snackbar />
            </>
            {/* </AuthProvider> */}
          </NavigationScroll>
        </Locales>
      </RTLLayout>
    </ThemeCustomization>
  );
};

export default App;
