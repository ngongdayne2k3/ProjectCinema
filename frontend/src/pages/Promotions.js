import React from "react";
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Container } from "@mui/material";

const Promotions = () => {
  // Danh sách khuyến mãi chung
  const generalPromotions = [
    "Giảm 5% cho vé phim vào thứ 4 hàng tuần",
    "Mua 1 tặng 1 bắp nước vào Chủ Nhật",
    "Combo bắp nước 99.000 VND cho tất cả phim",
  ];

  // Giả lập thông tin thành viên
  const userMembership = "Vàng"; // Giá trị này có thể được lấy từ state hoặc API
  const userPoints = 1200; // Giả lập điểm tích lũy

  // Danh sách ưu đãi theo cấp thành viên
  const membershipPromotions = {
    "Thường": ["✔ Giảm 5% cho vé phim"],
    "Bạc": ["✔ Giảm 10% cho vé phim", "✔ Bắp nước miễn phí vào thứ 2"],
    "Vàng": ["✔ Giảm 15% cho vé phim", "✔ Bắp nước miễn phí", "✔ Ưu tiên chọn ghế"],
    "Kim Cương": ["✔ Giảm 20% cho vé phim", "✔ Bắp nước miễn phí", "✔ Ưu tiên chọn ghế", "✔ Tham gia sự kiện VIP"],
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" p={4}>
        <Typography variant="h4" gutterBottom>Chương Trình Khuyến Mãi</Typography>

        {/* Khuyến mãi chung */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Ưu đãi chung</Typography>
            <List>
              {generalPromotions.map((promo, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`✔ ${promo}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Ưu đãi theo cấp thành viên */}
        {userMembership && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Ưu đãi dành cho thành viên {userMembership}</Typography>
              <Typography variant="body2">Điểm tích lũy: {userPoints}</Typography>
              <List>
                {membershipPromotions[userMembership].map((promo, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={promo} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default Promotions;
