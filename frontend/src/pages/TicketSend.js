import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

const TicketSent = ({ onBackToHome }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ width: 400, p: 2, boxShadow: 3, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            🎟️ Vé đã được gửi!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Cảm ơn bạn đã đặt vé. Vé của bạn đã được gửi qua email/SMS.
          </Typography>
          <Box mt={3}>
            <Button variant="contained" color="primary" onClick={onBackToHome}>
              Quay về trang chủ
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TicketSent;
