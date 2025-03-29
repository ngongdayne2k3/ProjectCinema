import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Đã đăng xuất!");
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" p={4}>
        <Typography variant="h4" gutterBottom>Hồ Sơ Của Bạn</Typography>
        <Typography variant="h6">Tên: Nguyễn Văn A</Typography>
        <Typography variant="h6">Email: example@email.com</Typography>
        <Typography variant="h6">Điểm Tích Lũy: 1200</Typography>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Chỉnh sửa hồ sơ</Button>
        <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={handleLogout}>Đăng Xuất</Button>
      </Box>
    </Container>
  );
};

export default Profile;
