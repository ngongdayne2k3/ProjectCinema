import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    alert("Đăng nhập thành công!");
    navigate("/profile");
  };

  return (
    <Container maxWidth="xs">
      <Box textAlign="center" p={4}>
        <Typography variant="h5" gutterBottom>Đăng Nhập</Typography>
        <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth margin="normal" label="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Đăng Nhập</Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Chưa có tài khoản? <Button onClick={() => navigate("/register")} color="secondary">Đăng ký</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
