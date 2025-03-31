import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Project Cinema
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/")}>Trang Chủ</Button>
          <Button color="inherit" onClick={() => navigate("/history")}>Lịch Sử</Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>Tài Khoản</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
