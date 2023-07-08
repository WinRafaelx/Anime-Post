import * as React from "react";
import {
  IconButton,
  AppBar,
  Box,
  Typography,
  Menu,
  Toolbar,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import AddIcon from "@mui/icons-material/Add";
import "./Css/Nav.css";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext.jsx";

const pages = ["Add"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const gotoAdd = () => {
    navigate("/add");
  };

  const gotoHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err.massage);
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#242427", color: "#FFFFFF" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesSharpIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              ml: 2,
              cursor: "pointer",
            }}
            onClick={gotoHome}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={gotoHome}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            AnimeBlog
          </Typography>

          {/* Phone Responsive */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={gotoAdd}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AutoStoriesSharpIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            onClick={gotoHome}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={gotoHome}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AnimeBlog
          </Typography>

          {/* Desktop */}
          <IconButton
            aria-label="addicon"
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              backgroundColor: "#313135",
            }}
            className="MyCustomButton"
            onClick={gotoAdd}
          >
            <AddIcon />
          </IconButton>

          {/* Login Part */}
          {user ? (
            <>
              <Box
                sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}
              ></Box>
              <Typography
                variant="h5"
                sx={{
                  mr: 2,
                  flexGrow: 0,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  align: "left",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {user.displayName}
              </Typography>
              <Box sx={{ flexGrow: 0, p:1 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 1 }}>
                    <Avatar src={user.photoURL} sx={{height:"50px", width:"50px"}}/>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key={"profile"} onClick={handleLogout}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem key={"logout"} onClick={handleLogout}>
                    <Typography textAlign="center">Log out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}
              ></Box>
              <Button
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexGrow: 0,
                  mr: 2,
                }}
                variant="outlined"
                color="error"
                onClick={() => navigate("/register")}
                size="medium"
              >
                Register
              </Button>
              <Button
                sx={{ display: { xs: "none", md: "flex" }, flexGrow: 0 }}
                variant="contained"
                size="medium"
                onClick={() => navigate("/login")}
                color="warning"
              >
                Log In
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
