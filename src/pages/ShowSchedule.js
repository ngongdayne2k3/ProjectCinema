import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const schedules = [
  { id: 1, movie: "Avengers: Endgame", cinema: "CGV Nguyễn Du", room: "Phòng 1", time: "14:00 - 16:30" },
  { id: 2, movie: "Parasite", cinema: "BHD Bitexco", room: "Phòng 3", time: "19:00 - 21:15" },
];

const ShowSchedule = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        🗓️ Quản Lý Lịch Chiếu
      </Typography>
      
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        + Thêm lịch chiếu
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Phim</TableCell>
              <TableCell>Rạp</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Giờ chiếu</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.movie}</TableCell>
                <TableCell>{schedule.cinema}</TableCell>
                <TableCell>{schedule.room}</TableCell>
                <TableCell>{schedule.time}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" size="small" sx={{ mr: 1 }}>
                    Sửa
                  </Button>
                  <Button variant="contained" color="error" size="small">
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ShowSchedule;
