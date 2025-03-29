import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import MainLayout from "./MainLayout";

const RoomForm = ({ room, onSave, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: room || {
      roomNumber: "",
      capacity: "",
    },
  });

  const onSubmit = (data) => {
    onSave({ ...room, ...data, capacity: parseInt(data.capacity) }); // Chuyển capacity thành số
  };

  return (
    <MainLayout hideHeader={true} hideSidebar={true}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: "auto" }}>
        <DialogTitle sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
          {room ? "Sửa Phòng Chiếu" : "Thêm Phòng Chiếu"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={2}>
            <TextField
              label="Phòng Chiếu"
              {...register("roomNumber", { required: "Phòng chiếu là bắt buộc" })}
              error={!!errors.roomNumber}
              helperText={errors.roomNumber?.message}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Sức Chứa"
              type="number"
              {...register("capacity", {
                required: "Sức chứa là bắt buộc",
                min: { value: 1, message: "Sức chứa phải lớn hơn 0" },
                max: { value: 100, message: "Sức chứa không được vượt quá 100" }, // Kiểm tra tối đa 100
              })}
              error={!!errors.capacity}
              helperText={errors.capacity?.message}
              required
              fullWidth
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-end", gap: 1, pb: 2, pr: 2 }}>
          <Button
            onClick={onClose}
            sx={{
              color: "#9c27b0",
              borderColor: "#9c27b0",
              "&:hover": { borderColor: "#7b1fa2", color: "#7b1fa2" },
            }}
            variant="outlined"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            {room ? "Lưu" : "Thêm"}
          </Button>
        </DialogActions>
      </Box>
    </MainLayout>
  );
};

export default RoomForm;