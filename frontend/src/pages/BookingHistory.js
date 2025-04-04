import React from "react";
import { Box, Typography, Container, Card, CardContent, CardMedia, Grid, Chip } from "@mui/material";

const bookings = [
  { 
    movie: "Avengers: Endgame", 
    date: "28/03/2025", 
    seats: ["A1", "A2"], 
    price: "200.000 VND", 
    status: "Đã sử dụng",
    image: "https://via.placeholder.com/150?text=Avengers"
  },
  { 
    movie: "Joker", 
    date: "20/03/2025", 
    seats: ["B5"], 
    price: "100.000 VND", 
    status: "Chưa sử dụng",
    image: "https://via.placeholder.com/150?text=Joker"
  }
];

const BookingHistory = () => {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" p={4}>
        <Typography variant="h4" gutterBottom>Lịch Sử Đặt Vé</Typography>
        <Grid container spacing={3}>
          {bookings.map((booking, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardMedia component="img" height="140" image={booking.image} alt={booking.movie} />
                <CardContent>
                  <Typography variant="h6">{booking.movie}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ngày: {booking.date} | Ghế: {booking.seats.join(", ")} | Giá: {booking.price}
                  </Typography>
                  <Chip 
                    label={booking.status} 
                    color={booking.status === "Đã sử dụng" ? "secondary" : booking.status === "Chưa sử dụng" ? "primary" : "default"} 
                    sx={{ mt: 1 }} 
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BookingHistory;
