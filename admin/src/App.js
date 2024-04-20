import React from "react";

// project imports
import Routes from "routes";
import Locales from "ui-component/Locales";
import NavigationScroll from "layout/NavigationScroll";
import RTLLayout from "ui-component/RTLLayout";
import Snackbar from "ui-component/extended/Snackbar";
import setAuthToken from "Helpers/setAuthToken";

import { store } from "store";
import ThemeCustomization from "themes";

// ==============================|| APP ||============================== //

const App = () => {

  if (localStorage?.exhibition_admin_token) {
    setAuthToken(localStorage.exhibition_admin_token);
  }

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
