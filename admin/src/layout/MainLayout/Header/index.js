// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Typography } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import ProfileSection from "./ProfileSection";
import { useDispatch, useSelector } from "store";
import { openDrawer } from "store/slices/menu";

// assets
import { IconMenu2 } from "@tabler/icons";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          alignItems: "center",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: "hidden",
            transition: "all .2s ease-in-out",
            background: "#DEF5FD",
            color: "#00AEEF !important",
            "&:hover": {
              background: "#00AEEF  !important",
              color: "#fff !important",
            },
          }}
          onClick={() => dispatch(openDrawer(!drawerOpen))}
          color="inherit"
        >
          <IconMenu2 stroke={1.5} size="1.3rem" />
        </Avatar>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* Profile Section Menu */}
      <ProfileSection />
    </>
  );
};

export default Header;
