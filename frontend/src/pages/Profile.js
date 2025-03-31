import React from "react";
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Container } from "@mui/material";

const Profile = () => {
  // Giả lập lịch sử đặt vé
  const bookingHistory = [
    { movie: "Avengers: Endgame", price: 200000 },
    { movie: "Joker", price: 100000 },
    { movie: "Inception", price: 150000 },
  ];

  // Tính tổng điểm từ giá vé (10.000 VND = 1 điểm)
  const totalPoints = bookingHistory.reduce((acc, booking) => acc + booking.price / 10000, 0);

  // Xác định cấp độ thành viên
  const getMembershipLevel = (points) => {
    if (points >= 2000) return "Kim Cương";
    if (points >= 1000) return "Vàng";
    if (points >= 500) return "Bạc";
    return "Thường";
  };

  const membership = getMembershipLevel(totalPoints);

  // Danh sách ưu đãi theo cấp thành viên
  const promotions = {
    "Thường": ["Giảm 5% cho vé phim"],
    "Bạc": ["Giảm 10% cho vé phim", "Bắp nước miễn phí vào thứ 2"],
    "Vàng": ["Giảm 15% cho vé phim", "Bắp nước miễn phí", "Ưu tiên chọn ghế"],
    "Kim Cương": ["Giảm 20% cho vé phim", "Bắp nước miễn phí", "Ưu tiên chọn ghế", "Tham gia sự kiện VIP"],
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" p={4}>
        <Typography variant="h4" gutterBottom>Thông Tin Cá Nhân</Typography>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Nguyễn Văn A</Typography>
            <Typography>Email: nguyenvana@example.com</Typography>
            <Typography>Điểm tích lũy: {totalPoints.toFixed(0)}</Typography>
            <Typography>Cấp bậc: {membership}</Typography>
          </CardContent>
        </Card>

        <Typography variant="h5" gutterBottom>Ưu Đãi Dành Cho Bạn</Typography>
        <List>
          {promotions[membership].map((promo, index) => (
            <ListItem key={index}>
              <ListItemText primary={`✔ ${promo}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Profile;
