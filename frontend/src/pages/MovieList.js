import React from "react";

const MovieList = () => {
  const movies = [
    { id: 1, title: "Avengers: Endgame" },
    { id: 2, title: "The Batman" },
    { id: 3, title: "Spider-Man: No Way Home" },
  ];

  return (
    <div>
      <h2>Chọn phim</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
