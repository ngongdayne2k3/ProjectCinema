import React, { useState } from "react";
import { AppBar, Toolbar, Box, Menu, MenuItem, IconButton, Avatar, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
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
    navigate("/login"); // Điều hướng về trang đăng nhập sau khi logout
  };

  // Danh sách các route admin
  const adminRoutes = ["/admin/movies", "/schedules", "/rooms", "/dashboard", "/seats"];
  const isAdminRoute = adminRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith(route + "/")
  );

  // Các nút điều hướng dựa trên ngữ cảnh (user hoặc admin)
  const menuItems = isAdminRoute
    ? [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Quản lý phim", path: "/admin/movies" },
        { label: "Lịch chiếu", path: "/schedules" },
        { label: "Phòng chiếu", path: "/rooms" },
      ]
    : [
        { label: "Trang Chủ", path: "/" },
        { label: "Lịch Sử", path: "/history" },
        { label: "Tài Khoản", path: "/profile" },
        { label: "Mua vé", path: "/movies" },
        { label: "Rạp & giá vé", path: "/pricing" },
      ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
          <img src="/Logo.jpg" alt="Cinema Logo" style={{ height: 50 }} />
        </Box>

        {/* Menu điều hướng */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{
                color: location.pathname === item.path ? "primary.main" : "black",
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

export default Header;