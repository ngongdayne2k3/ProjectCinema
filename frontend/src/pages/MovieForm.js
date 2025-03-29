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

const statuses = ["Đang chiếu", "Sắp chiếu", "Ngừng chiếu"];

const MovieForm = ({ movie, onSave, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: movie || {
      title: "",
      genre: "",
      duration: "",
      status: "", // Để trống để hiển thị placeholder
      poster: "",
    },
  });

  const onSubmit = (data) => {
    onSave({ ...movie, ...data });
  };

  return (
    <MainLayout hideHeader={true} hideSidebar={true}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: "auto" }}>
        <DialogTitle sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
          {movie ? "Sửa Phim" : "Thêm Phim"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={2}>
            <TextField
              label="Tên phim"
              {...register("title", { required: "Tên phim là bắt buộc" })}
              error={!!errors.title}
              helperText={errors.title?.message}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Thể loại"
              {...register("genre", { required: "Thể loại là bắt buộc" })}
              error={!!errors.genre}
              helperText={errors.genre?.message}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Thời lượng"
              {...register("duration", { required: "Thời lượng là bắt buộc" })}
              error={!!errors.duration}
              helperText={errors.duration?.message}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="URL Poster"
              {...register("poster", { required: "URL Poster là bắt buộc" })}
              error={!!errors.poster}
              helperText={errors.poster?.message}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              select
              label="Trạng thái"
              {...register("status", { required: "Trạng thái là bắt buộc" })}
              error={!!errors.status}
              helperText={errors.status?.message}
              defaultValue={movie?.status || ""}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Trạng thái
              </MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
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
            {movie ? "Lưu" : "Thêm"}
          </Button>
        </DialogActions>
      </Box>
    </MainLayout>
  );
};

export default MovieForm;