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

const statuses = ["Đang chiếu", "Sắp chiếu", "Ngừng chiếu"];

const MovieForm = ({ movie, onSave, onClose }) => {
  const { register, handleSubmit} = useForm({
    defaultValues: movie || {
      title: "",
      genre: "",
      duration: "",
      status: "Đang chiếu",
      poster: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSave({ ...movie, ...data });
      })}
    >
      <DialogTitle>{movie ? "Sửa Phim" : "Thêm Phim"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField label="Tên phim" {...register("title")} required />
          <TextField label="Thể loại" {...register("genre")} required />
          <TextField label="Thời lượng" {...register("duration")} required />
          <TextField label="URL Poster" {...register("poster")} required />
          <TextField select label="Trạng thái" {...register("status")}>
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {movie ? "Lưu" : "Thêm"}
        </Button>
      </DialogActions>
    </form>
  );
};

export default MovieForm;
