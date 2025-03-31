import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showtime, seats, ticketCount } = location.state || {};

  if (!movie || !showtime || !seats) {
    return <Typography variant="h6" color="error">Không có dữ liệu đặt vé!</Typography>;
  }

  const handlePayment = () => {
    alert("Thanh toán thành công! Vé đã được gửi qua email.");
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ width: 400, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
            💳 Thanh Toán
          </Typography>
          <Typography variant="body1">🎬 Phim: {movie}</Typography>
          <Typography variant="body1">⏰ Suất chiếu: {showtime}</Typography>
          <Typography variant="body1">🎟 Số vé: {ticketCount}</Typography>
          <Typography variant="body1">🪑 Ghế: {seats.join(", ")}</Typography>

          <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={handlePayment}>
            Thanh Toán
          </Button>
          <Button variant="outlined" color="error" fullWidth sx={{ mt: 1 }} onClick={() => navigate("/")}>
            Hủy
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payment;
