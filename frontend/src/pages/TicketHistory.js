import React from "react";
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";

const ticketHistory = [
  { id: 1, movie: "Avengers: Endgame", date: "25/03/2025", time: "19:00", seats: ["A1", "A2"], points: 10 },
  { id: 2, movie: "Joker", date: "20/03/2025", time: "17:00", seats: ["B5"], points: 5 },
  { id: 3, movie: "Inception", date: "18/03/2025", time: "15:30", seats: ["C3", "C4", "C5"], points: 15 },
];

const TicketHistory = () => {
  const totalPoints = ticketHistory.reduce((sum, ticket) => sum + ticket.points, 0);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Lịch Sử Đặt Vé</Typography>

      <List>
        {ticketHistory.map((ticket) => (
          <Card key={ticket.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{ticket.movie}</Typography>
              <Typography variant="body2">
                Ngày: {ticket.date} - Giờ: {ticket.time} - Ghế: {ticket.seats.join(", ")}
              </Typography>
              <Typography variant="body2">Điểm nhận được: {ticket.points}</Typography>
            </CardContent>
          </Card>
        ))}
      </List>

      <Typography variant="h5" mt={3}>Tổng điểm tích lũy: {totalPoints} điểm</Typography>
    </Box>
  );
};

export default TicketHistory;
