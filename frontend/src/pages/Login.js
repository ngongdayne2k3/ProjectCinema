import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

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

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
  };

  return (
    <Container maxWidth="xs">
      <Box textAlign="center" p={4}>
        <Typography variant="h5" gutterBottom>Đăng Nhập</Typography>
        <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth margin="normal" label="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Đăng Nhập</Button>

        <Divider sx={{ my: 2 }}>hoặc</Divider>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{ 
            mb: 2,
            color: '#757575',
            borderColor: '#757575',
            '&:hover': {
              borderColor: '#424242',
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          Đăng nhập bằng Google
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Chưa có tài khoản? <Button onClick={() => navigate("/register")} color="secondary">Đăng ký</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
