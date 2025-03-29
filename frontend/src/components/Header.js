import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Đăng xuất...");
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box>
          <img src="/Logo.jpg" alt="Cinema Logo" style={{ height: 50 }} />
        </Box>

        {/* Menu */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography variant="h6" sx={{ cursor: "pointer", color: "black" }}>
            Mua vé
          </Typography>
          <Typography variant="h6" sx={{ cursor: "pointer", color: "black" }}>
            Rạp & giá vé
          </Typography>
        </Box>

        {/* Account */}
        <Box>
          <IconButton onClick={handleMenuOpen}>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
