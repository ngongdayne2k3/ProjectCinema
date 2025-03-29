import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Dialog,
} from "@mui/material";
import MainLayout from "./MainLayout";
import RoomForm from "./RoomForm";

const initialRooms = [
  { id: 1, roomNumber: "Phòng-01", capacity: 50 },
  { id: 2, roomNumber: "Phòng-02", capacity: 60 },
  { id: 3, roomNumber: "Phòng-03", capacity: 70 },
  { id: 4, roomNumber: "Phòng-04", capacity: 80 },
  { id: 5, roomNumber: "Phòng-05", capacity: 90 },
  { id: 6, roomNumber: "Phòng-06", capacity: 100 },
  { id: 7, roomNumber: "Phòng-07", capacity: 100 },
];

const ScreenRooms = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [open, setOpen] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const navigate = useNavigate();

  const handleAdd = () => {
    setEditRoom(null);
    setOpen(true);
  };

  const handleEdit = (room) => {
    setEditRoom(room);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng chiếu này?")) {
      setRooms(rooms.filter((room) => room.id !== id));
    }
  };

  const handleSave = (room) => {
    const isDuplicate = rooms.some(
      (r) => r.id !== room.id && r.roomNumber === room.roomNumber
    );
    if (isDuplicate) {
      alert("Phòng chiếu này đã tồn tại! Vui lòng chọn mã phòng khác.");
      return;
    }

    if (room.id) {
      setRooms(rooms.map((r) => (r.id === room.id ? { ...r, ...room } : r)));
    } else {
      setRooms([...rooms, { ...room, id: rooms.length + 1 }]);
    }
    setOpen(false);
    setEditRoom(null);
  };

  const handleViewSeats = (roomId) => {
    navigate(`/seats/${roomId}`);
  };

  return (
    <MainLayout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          🎥 Quản Lý Phòng Chiếu
        </Typography>

        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAdd}>
          + Thêm phòng chiếu
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Phòng Chiếu</TableCell>
                <TableCell>Sức Chứa</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(room)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleDelete(room.id)}
                    >
                      Xóa
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleViewSeats(room.id)}
                    >
                      Xem Ghế
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <RoomForm
            room={editRoom}
            onSave={handleSave}
            onClose={() => {
              setOpen(false);
              setEditRoom(null);
            }}
          />
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default ScreenRooms;