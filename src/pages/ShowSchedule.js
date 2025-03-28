import React, { useState } from "react";
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
import ScheduleForm from "./ScheduleForm";

const initialSchedules = [
  {
    id: 1,
    movie: "Wonder Woman 1984",
    cinema: "PC-02",
    date: "2021-07-11",
    time: "20:45",
    type: "2D",
    price: "60,000 VND",
  },
  {
    id: 2,
    movie: "Toy Story 4",
    cinema: "PC-07",
    date: "2021-07-11",
    time: "19:30",
    type: "2D",
    price: "60,000 VND",
  },
];

const ShowSchedule = () => {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [open, setOpen] = useState(false);
  const [editSchedule, setEditSchedule] = useState(null);

  const handleAdd = () => {
    setEditSchedule(null);
    setOpen(true);
  };

  const handleEdit = (schedule) => {
    setEditSchedule(schedule);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch chiếu này?")) {
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    }
  };

  const handleSave = (schedule) => {
    // Kiểm tra trùng lặp rạp chiếu, ngày chiếu và suất chiếu
    const isConflict = schedules.some(
      (s) =>
        s.id !== schedule.id && // Bỏ qua lịch chiếu hiện tại nếu đang sửa
        s.cinema === schedule.cinema &&
        s.date === schedule.date &&
        s.time === schedule.time
    );

    if (isConflict) {
      alert("Lịch chiếu này trùng với một lịch chiếu khác! Vui lòng chọn rạp, ngày hoặc suất chiếu khác.");
      return;
    }

    if (schedule.id) {
      // Sửa lịch chiếu
      setSchedules(schedules.map((s) => (s.id === schedule.id ? { ...s, ...schedule } : s)));
    } else {
      // Thêm lịch chiếu mới
      setSchedules([...schedules, { ...schedule, id: schedules.length + 1 }]);
    }
    setOpen(false);
    setEditSchedule(null);
  };

  return (
    <MainLayout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          🗓️ Quản Lý Lịch Chiếu
        </Typography>

        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAdd}>
          + Thêm lịch chiếu
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên Phim</TableCell>
                <TableCell>Rạp Chiếu</TableCell>
                <TableCell>Ngày Chiếu</TableCell>
                <TableCell>Suất Chiếu</TableCell>
                <TableCell>Loại Chiếu</TableCell>
                <TableCell>Giá Vé</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.movie}</TableCell>
                  <TableCell>{schedule.cinema}</TableCell>
                  <TableCell>{schedule.date}</TableCell>
                  <TableCell>{schedule.time}</TableCell>
                  <TableCell>{schedule.type}</TableCell>
                  <TableCell>{schedule.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(schedule)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(schedule.id)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <ScheduleForm
            schedule={editSchedule}
            onSave={handleSave}
            onClose={() => {
              setOpen(false);
              setEditSchedule(null);
            }}
          />
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default ShowSchedule;