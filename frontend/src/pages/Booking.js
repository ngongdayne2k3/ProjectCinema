import React, { useState } from "react";
import { Box, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const movies = [
  { title: "Avengers: Endgame", showtimes: ["10:00", "13:00", "16:00", "19:00"] },
  { title: "Joker", showtimes: ["11:00", "14:00", "17:00", "20:00"] },
  { title: "Inception", showtimes: ["09:30", "12:30", "15:30", "18:30"] }
];

const rows = ["A", "B", "C", "D", "E"];
const seatsPerRow = 8;

const Booking = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const availableShowtimes = movies.find((m) => m.title === selectedMovie)?.showtimes || [];

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
    if (!selectedMovie || !selectedShowtime || selectedSeats.length !== ticketCount) {
      alert("Vui lòng chọn đầy đủ thông tin!");
      return;
    }
    navigate("/payment", { state: { movie: selectedMovie, showtime: selectedShowtime, seats: selectedSeats, ticketCount } });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" gutterBottom>Đặt Vé</Typography>

      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel>Chọn Phim</InputLabel>
        <Select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
          {movies.map((movie) => (
            <MenuItem key={movie.title} value={movie.title}>{movie.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 300 }} disabled={!selectedMovie}>
        <InputLabel>Suất Chiếu</InputLabel>
        <Select value={selectedShowtime} onChange={(e) => setSelectedShowtime(e.target.value)}>
          {availableShowtimes.map((time) => (
            <MenuItem key={time} value={time}>{time}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel>Số Vé</InputLabel>
        <Select value={ticketCount} onChange={(e) => setTicketCount(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" sx={{ mt: 3 }}>Chọn Ghế</Typography>
      <Box display="grid" gridTemplateColumns={`repeat(${seatsPerRow}, 50px)`} gap={1} mt={2}>
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

      <Button variant="contained" color="secondary" onClick={handleContinue} sx={{ mt: 3 }}>
        Xác nhận & Tiếp tục
      </Button>
    </Box>
  );
};

export default Booking;
