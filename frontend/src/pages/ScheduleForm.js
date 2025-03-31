import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import MainLayout from "./MainLayout";

const types = ["2D", "3D", "IMAX"];
const cinemas = ["PC-01", "PC-02", "PC-03", "PC-04", "PC-05", "PC-06", "PC-07"]; // Danh sách rạp chiếu

const ScheduleForm = ({ schedule, onSave, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: schedule || {
      movie: "",
      cinema: "",
      date: "",
      time: "",
      type: "",
      price: "",
    },
  });

  const onSubmit = (data) => {
    onSave({ ...schedule, ...data });
  };

  return (
    <MainLayout hideHeader={true} hideSidebar={true}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: "auto" }}>
        <DialogTitle sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
          {schedule ? "Sửa Lịch Chiếu" : "Thêm Lịch Chiếu"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={2}>
            <TextField
              label="Tên Phim"
              {...register("movie", { required: "Tên phim là bắt buộc" })}
              error={!!errors.movie}
              helperText={errors.movie?.message}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              select
              label="Rạp Chiếu"
              {...register("cinema", { required: "Rạp chiếu là bắt buộc" })}
              error={!!errors.cinema}
              helperText={errors.cinema?.message}
              defaultValue={schedule?.cinema || ""}
              required
              fullWidth
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Chọn Rạp Chiếu
              </MenuItem>
              {cinemas.map((cinema) => (
                <MenuItem key={cinema} value={cinema}>
                  {cinema}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Ngày Chiếu"
              type="date"
              {...register("date", { required: "Ngày chiếu là bắt buộc" })}
              error={!!errors.date}
              helperText={errors.date?.message}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Suất Chiếu"
              type="time"
              {...register("time", { required: "Suất chiếu là bắt buộc" })}
              error={!!errors.time}
              helperText={errors.time?.message}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Loại Chiếu"
              {...register("type", { required: "Loại chiếu là bắt buộc" })}
              error={!!errors.type}
              helperText={errors.type?.message}
              defaultValue={schedule?.type || ""}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Loại Chiếu
              </MenuItem>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Giá Vé"
              {...register("price", { required: "Giá vé là bắt buộc" })}
              error={!!errors.price}
              helperText={errors.price?.message}
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
            {schedule ? "Lưu" : "Thêm"}
          </Button>
        </DialogActions>
      </Box>
    </MainLayout>
  );
};

export default ScheduleForm;