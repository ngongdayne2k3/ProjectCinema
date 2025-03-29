import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const rows = ["A", "B", "C", "D", "E"];
const seatsPerRow = 8;

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showtime, ticketCount } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < ticketCount) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      alert("Bạn đã chọn đủ số vé!");
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length !== ticketCount) {
      alert(`Vui lòng chọn đủ ${ticketCount} ghế!`);
      return;
    }
    navigate("/payment", { state: { movie, showtime, seats: selectedSeats, ticketCount } });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" gutterBottom>Chọn Ghế</Typography>
      <Typography variant="body1">Phim: {movie}</Typography>
      <Typography variant="body1">Suất chiếu: {showtime}</Typography>
      
      <Box display="grid" gridTemplateColumns={`repeat(${seatsPerRow}, 50px)`} gap={1} mt={3}>
        {rows.map((row) =>
          [...Array(seatsPerRow)].map((_, index) => {
            const seat = `${row}${index + 1}`;
            return (
              <Button
                key={seat}
                variant={selectedSeats.includes(seat) ? "contained" : "outlined"}
                color={selectedSeats.includes(seat) ? "primary" : "default"}
                onClick={() => handleSeatClick(seat)}
                sx={{ width: 50, height: 50 }}
              >
                {seat}
              </Button>
            );
          })
        )}
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleContinue}
        sx={{ mt: 3 }}
      >
        Xác nhận & Thanh toán
      </Button>
    </Box>
  );
};

export default SeatSelection;
