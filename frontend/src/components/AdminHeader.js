// components/AdminHeader.js
import React, { useState } from "react";
import { AppBar, Toolbar, Box, Menu, MenuItem, IconButton, Avatar, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const AdminHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Đăng xuất...");
    setAnchorEl(null);
    navigate("/login");
  };

  // Menu dành riêng cho admin
  const adminMenuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Quản lý phim", path: "/admin/movies" },
    { label: "Lịch chiếu", path: "/schedules" },
    { label: "Phòng chiếu", path: "/rooms" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box onClick={() => navigate("/dashboard")} sx={{ cursor: "pointer" }}>
          <img src="/Logo.jpg" alt="Cinema Logo" style={{ height: 50 }} />
        </Box>

        {/* Menu điều hướng admin */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {adminMenuItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{
                color: location.pathname === item.path ? "white" : "#e0e0e0",
                fontWeight: location.pathname === item.path ? "bold" : "normal",
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Account */}
        <Box>
          <IconButton onClick={handleMenuOpen}>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={() => navigate("/profile")}>Hồ sơ</MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;