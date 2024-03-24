// material-ui
import { useTheme } from "@mui/material/styles";
import logo from "assets/images/ExpoConnect.svg";

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <img
      src={theme.palette.mode === "dark" ? logo : logo}
      alt="App Logo"
      width="175px"
      style={{ marginTop: '3px' }}
    />
  );
};

export default Logo;
