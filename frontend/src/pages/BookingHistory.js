import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Container } from "@mui/material";

const BookingHistory = () => {
  const bookings = [
    { movie: "Avengers: Endgame", date: "28/03/2025", seats: ["A1", "A2"], price: "200.000 VND" },
    { movie: "Joker", date: "20/03/2025", seats: ["B5"], price: "100.000 VND" },
  ];

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" p={4}>
        <Typography variant="h4" gutterBottom>Lịch Sử Đặt Vé</Typography>
        <List>
          {bookings.map((booking, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`Phim: ${booking.movie}`}
                secondary={`Ngày: ${booking.date} | Ghế: ${booking.seats.join(", ")} | Giá: ${booking.price}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default BookingHistory;
