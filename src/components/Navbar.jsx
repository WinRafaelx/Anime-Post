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
import "./Css/Nav.css"
import { useNavigate } from "react-router-dom";

const pages = ["Add"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

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
  }

  const gotoHome = () => {
    navigate("/");
  } 

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#242427", color: "#FFFFFF", opacity: ".9" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesSharpIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, ml: 2, cursor: 'pointer' }}
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
              cursor: 'pointer'
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
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}></Box>
          <Typography
            variant="h6"
            sx={{
              mr: 3,
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              align: "left",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Rafaelx
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 2}}>
                <Avatar src="https://i.pinimg.com/564x/a6/0c/b0/a60cb07bbaaaf838c9cf1c77ff88871a.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
