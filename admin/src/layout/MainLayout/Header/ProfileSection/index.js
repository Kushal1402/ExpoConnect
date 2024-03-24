import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";

import { connect, useSelector } from "react-redux";

import { logout, loadUser } from "../../../../store/slices/userLoginAction";
// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import MainCard from "ui-component/cards/MainCard";
import Transitions from "ui-component/extended/Transitions";

import useAuth from "hooks/useAuth";

// assets
import { IconLogout, IconKey, IconSettings, IconUser } from "@tabler/icons";
import useConfig from "hooks/useConfig";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = (props) => {
  const theme = useTheme();
  const { borderRadius } = useConfig();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { admin, loading } = auth;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different components and specifying one type leads to other components throwing an error
   * */

  const anchorRef = useRef(null);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setSelectedIndex(-1);
  };
  const handleListItemClick = (event, index, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        className="chip-setting"
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: "#e3f2fd",
          backgroundColor: theme.palette.mode === "dark" ? theme.palette.dark.main : theme.palette.primary.light,
          background: "#025DBF",
          color: "#fff !important",
          "&:hover": {
            background: "#025DBF !important",
            color: "#fff !important",
          },
          "&:hover .MuiListItemIcon-root": {
            color: "#fff !important",
          },
          "&.Mui-selected .MuiListItemIcon-root": {
            color: "#fff !important",
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={admin?.profilePic}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            className="setting-icon"
            // color={theme.palette.primary.main}

            sx={{
              "&:hover": {
                color: "#fff !important",
              },
              "&:hover .MuiListItemIcon-root": {
                color: "#fff !important",
              },
              "&.Mui-selected .MuiListItemIcon-root": {
                color: "#fff !important",
              },
            }}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      // color="primary"
      />

      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard
                    border={false}
                    elevation={16}
                    content={false}
                    boxShadow
                    shadow={theme.shadows[16]}
                  >
                    {/* <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}> */}
                    <Box sx={{ p: 1 }}>
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "10px",
                          pt: 0,
                          pb: 0,
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0.5,
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{
                            borderRadius: `${borderRadius}px`,
                            "&:hover": {
                              color: "#00AEEF",
                            },
                            "&:hover .MuiListItemIcon-root": {
                              color: "#00AEEF !important",
                            },
                            "&.Mui-selected .MuiListItemIcon-root": {
                              color: "#00AEEF !important",
                            },
                          }}
                          selected={selectedIndex === 0}
                          onClick={(event) =>
                            handleListItemClick(event, 0, "/update-profile")
                          }
                        >
                          <ListItemIcon>
                            <IconUser
                              stroke={1.5}
                              size="1.3rem"
                              sx={{
                                "&:hover": {
                                  background: "#fff  !important",
                                  color: "#fff !important",
                                },
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{ color: "black" }}
                              >
                                Update Profile
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                          sx={{
                            borderRadius: `${borderRadius}px`,
                            "&:hover": {
                              color: "#00AEEF",
                            },
                            "&:hover .MuiListItemIcon-root": {
                              color: "#00AEEF !important",
                            },
                            "&.Mui-selected .MuiListItemIcon-root": {
                              color: "#00AEEF !important",
                            },
                          }}
                          selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemClick(event, 1, "/change-password")
                          }
                        >
                          <ListItemIcon>
                            <IconKey stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            // primary={
                            //   <Grid
                            //     container
                            //     spacing={1}
                            //     justifyContent="space-between"
                            //   >
                            //     <Grid item>
                            //       <Typography variant="body2">
                            //         Change Password
                            //       </Typography>
                            //     </Grid>
                            //   </Grid>
                            // }
                            primary={
                              <Typography
                                variant="body2"
                                sx={{ color: "black" }}
                              >
                                Change Password
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                          sx={{
                            borderRadius: `${borderRadius}px`,
                            mt: "0px !important",
                            "&:hover": {
                              color: "#00AEEF",
                            },
                            "&:hover .MuiListItemIcon-root": {
                              color: "#00AEEF !important",
                            },
                            "&.Mui-selected .MuiListItemIcon-root": {
                              color: "#00AEEF !important",
                            },
                          }}
                          selected={selectedIndex === 4}
                          // onClick={handleLogout}
                          component={Link}
                          to="/"
                          onClick={props.logout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{ color: "black" }}
                              >
                                Logout
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                    {/* </PerfectScrollbar> */}
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default connect(null, {
  logout,
  loadUser,
})(ProfileSection);
