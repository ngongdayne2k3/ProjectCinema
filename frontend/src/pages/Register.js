import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    alert("Đăng ký thành công! Hãy đăng nhập.");
    navigate("/login");
  };

  return (
    <Container maxWidth="xs">
      <Box textAlign="center" p={4}>
        <Typography variant="h5" gutterBottom>Đăng Ký</Typography>
        <TextField fullWidth margin="normal" label="Tên" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth margin="normal" label="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>Đăng Ký</Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Đã có tài khoản? <Button onClick={() => navigate("/login")} color="secondary">Đăng nhập</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
