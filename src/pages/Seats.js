import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

const seats = [
  { id: "A1", status: "available" },
  { id: "A2", status: "booked" },
  { id: "A3", status: "available" },
  { id: "B1", status: "booked" },
  { id: "B2", status: "available" },
];

const Seats = () => {
  const { roomId } = useParams();

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        🎟️ Danh Sách Ghế - Phòng {roomId}
      </Typography>

      <Grid container spacing={2}>
        {seats.map((seat) => (
          <Grid item key={seat.id}>
            <Paper
              sx={{
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: seat.status === "booked" ? "red" : "green",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {seat.id}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        + Thêm ghế
      </Button>
    </Box>
  );
};

export default Seats;
