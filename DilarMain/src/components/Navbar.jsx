import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  Notifications as BellIcon,
  AccountCircle as UserCircleIcon,
  Settings as SettingsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  PlayCircle as PlayIcon
} from "@mui/icons-material";

function Navbar({ toggleSidebar }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navbarRef = useRef(null);
  const profileAnchorRef = useRef(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileMenuClose = () => {
    setIsProfileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // implement theme switching logic here
  };

  const handleVideoOpen = () => {
    window.open("https://www.youtube.com/watch?v=vDMyIZ2nsS0", "_blank");
  };

  return (
    <AppBar
      position="static"
      ref={navbarRef}
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        padding: 1,
        color: 'text.primary'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Menu Icon Button */}
        <IconButton
          onClick={toggleSidebar}
          sx={{
            p: 1,
            '&:hover': {
              backgroundColor: 'rgba(206, 209, 213, 0.2)',
            },
            color: 'text.primary'
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Dark Mode Toggle */}
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Settings */}
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>

          {/* Video Play Button */}
          <IconButton onClick={handleVideoOpen} color="inherit">
            <PlayIcon />
          </IconButton>

          {/* Profile Menu */}
          <Box sx={{ position: 'relative' }}>
            <IconButton
              ref={profileAnchorRef}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              color="inherit"
            >
              <UserCircleIcon fontSize="medium" />
            </IconButton>

            {/* Profile Menu Dropdown */}
            <Menu
              anchorEl={profileAnchorRef.current}
              open={isProfileMenuOpen}
              onClose={handleProfileMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleProfileMenuClose}>
                <Typography variant="body2">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <Typography variant="body2">Settings</Typography>
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <Typography variant="body2">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;