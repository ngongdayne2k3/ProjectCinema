import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
} from "@mui/material";
import MainLayout from "./MainLayout";

// Dữ liệu phòng chiếu (lấy từ ScreenRooms)
const rooms = [
  { id: 1, roomNumber: "PC-01", capacity: 50 },
  { id: 2, roomNumber: "PC-02", capacity: 60 },
  { id: 3, roomNumber: "PC-03", capacity: 70 },
  { id: 4, roomNumber: "PC-04", capacity: 80 },
  { id: 5, roomNumber: "PC-05", capacity: 90 },
  { id: 6, roomNumber: "PC-06", capacity: 100 },
  { id: 7, roomNumber: "PC-07", capacity: 100 },
];

const Seats = () => {
  const { roomId } = useParams(); // Lấy roomId từ URL
  const room = rooms.find((r) => r.id === parseInt(roomId)); // Tìm phòng chiếu theo roomId

  // Tạo danh sách ghế dựa trên sức chứa của phòng
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (room) {
      const columnsPerRow = 10; // Số cột mỗi hàng
      const rows = Math.ceil(room.capacity / columnsPerRow); // Số hàng
      const middleRowsStart = Math.floor(rows / 3); // Bắt đầu hàng giữa
      const middleRowsEnd = Math.ceil((2 * rows) / 3); // Kết thúc hàng giữa
      const middleColsStart = Math.floor(columnsPerRow / 3); // Bắt đầu cột giữa
      const middleColsEnd = Math.ceil((2 * columnsPerRow) / 3); // Kết thúc cột giữa

      // Tạo danh sách ghế
      const generatedSeats = Array.from({ length: room.capacity }, (_, index) => {
        const rowIndex = Math.floor(index / columnsPerRow); // Hàng hiện tại
        const colIndex = index % columnsPerRow; // Cột hiện tại
        const isVIP =
          rowIndex >= middleRowsStart &&
          rowIndex < middleRowsEnd &&
          colIndex >= middleColsStart &&
          colIndex < middleColsEnd; // Ghế VIP ở giữa

        return {
          id: index + 1,
          seatNumber: `Ghế ${index + 1}`,
          row: String.fromCharCode(65 + rowIndex), // Nhãn hàng: A, B, C, ...
          col: (colIndex + 1).toString(), // Nhãn cột: 1, 2, 3, ...
          status: Math.random() > 0.5 ? "Trống" : "Đã đặt", // Trạng thái ngẫu nhiên
          isVIP, // Đánh dấu ghế VIP
        };
      });
      setSeats(generatedSeats);
    }
  }, [room]);

  if (!room) {
    return (
      <MainLayout>
        <Box p={3}>
          <Typography variant="h4" gutterBottom>
            Phòng chiếu không tồn tại
          </Typography>
        </Box>
      </MainLayout>
    );
  }

  const columnsPerRow = 10; // Số cột mỗi hàng
  const rows = Math.ceil(room.capacity / columnsPerRow); // Số hàng
  const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i)); // Nhãn hàng: A, B, C, ...

  return (
    <MainLayout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          🛋️ Sơ Đồ Ghế - Phòng {room.roomNumber}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Sức chứa: {room.capacity} ghế
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Nhãn cột */}
          <Box display="flex" mb={1}>
            <Box width={40} />
            {Array.from({ length: columnsPerRow }, (_, i) => (
              <Box key={i} width={60} textAlign="center">
                {i + 1}
              </Box>
            ))}
          </Box>

          {/* Ghế */}
          {rowLabels.map((rowLabel, rowIndex) => (
            <Box key={rowLabel} display="flex" alignItems="center" mb={1}>
              <Box width={40} textAlign="center">
                {rowLabel}
              </Box>
              <Box display="grid" gridTemplateColumns="repeat(10, 60px)" gap={1}>
                {seats
                  .slice(rowIndex * columnsPerRow, (rowIndex + 1) * columnsPerRow)
                  .map((seat) => (
                    <Box
                      key={seat.id}
                      sx={{
                        width: 60,
                        height: 60,
                        backgroundColor: seat.isVIP
                          ? seat.status === "Trống"
                            ? "orange" // Ghế VIP trống: màu vàng
                            : "red" // Ghế VIP đã đặt: màu đỏ
                          : seat.status === "Trống"
                          ? "green" // Ghế thường trống: màu xanh
                          : "red", // Ghế thường đã đặt: màu đỏ
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                        position: "relative",
                        color: "white",
                        fontSize: "0.8rem",
                      }}
                    >
                      {seat.isVIP && (
                        <Box
                          component="span"
                          sx={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                            fontSize: "0.6rem",
                            color: "white",
                            backgroundColor: "purple",
                            borderRadius: "50%",
                            width: 16,
                            height: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          VIP
                        </Box>
                      )}
                      {seat.col}
                    </Box>
                  ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box mt={3}>
          <Typography variant="body1">
            <Box component="span" sx={{ color: "green", mr: 1 }}>■</Box> Ghế Thường Trống
          </Typography>
          <Typography variant="body1">
            <Box component="span" sx={{ color: "red", mr: 1 }}>■</Box> Ghế Thường Đã Đặt
          </Typography>
          <Typography variant="body1">
            <Box component="span" sx={{ color: "orange", mr: 1 }}>■</Box> Ghế VIP Trống
          </Typography>
          <Typography variant="body1">
            <Box component="span" sx={{ color: "red", mr: 1 }}>■</Box> Ghế VIP Đã Đặt
          </Typography>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Seats;