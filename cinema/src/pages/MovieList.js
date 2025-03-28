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
  Avatar,
  Typography,
  Dialog,
} from "@mui/material";
import MovieForm from "./MovieForm"; // Import form

const initialMovies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    genre: "Hành động, Viễn tưởng",
    duration: "181 phút",
    status: "Đang chiếu",
    poster: "https://i.imgur.com/8Km9tLL.jpg",
  },
  {
    id: 2,
    title: "Parasite",
    genre: "Tâm lý, Hài hước",
    duration: "132 phút",
    status: "Sắp chiếu",
    poster: "https://i.imgur.com/oYiTqum.jpg",
  },
];

const MovieList = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [open, setOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);

  const handleAdd = () => {
    setEditMovie(null);
    setOpen(true);
  };

  const handleEdit = (movie) => {
    setEditMovie(movie);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const handleSave = (movie) => {
    if (movie.id) {
      setMovies(movies.map((m) => (m.id === movie.id ? movie : m)));
    } else {
      setMovies([...movies, { ...movie, id: movies.length + 1 }]);
    }
    setOpen(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        🎬 Danh Sách Phim
      </Typography>
      
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAdd}>
        + Thêm phim mới
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell>Tên phim</TableCell>
              <TableCell>Thể loại</TableCell>
              <TableCell>Thời lượng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>
                  <Avatar variant="rounded" src={movie.poster} />
                </TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.duration}</TableCell>
                <TableCell>{movie.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" size="small" sx={{ mr: 1 }} onClick={() => handleEdit(movie)}>
                    Sửa
                  </Button>
                  <Button variant="contained" color="error" size="small" onClick={() => handleDelete(movie.id)}>
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <MovieForm movie={editMovie} onSave={handleSave} onClose={() => setOpen(false)} />
      </Dialog>
    </Box>
  );
};

export default MovieList;
