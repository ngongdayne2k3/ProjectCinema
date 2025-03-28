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
import { useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout"; // Import MainLayout

const rooms = [
  { id: 1, cinema: "CGV Nguyễn Du", roomNumber: "Phòng 1", totalSeats: 50 },
  { id: 2, cinema: "BHD Bitexco", roomNumber: "Phòng 3", totalSeats: 75 },
];

const ScreenRooms = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          🏢 Quản Lý Phòng Chiếu
        </Typography>

        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          + Thêm phòng chiếu
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rạp</TableCell>
                <TableCell>Phòng</TableCell>
                <TableCell>Tổng ghế</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.cinema}</TableCell>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.totalSeats}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => navigate(`/seats/${room.id}`)}
                    >
                      Xem ghế
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
    </MainLayout>
  );
};

export default ScreenRooms;