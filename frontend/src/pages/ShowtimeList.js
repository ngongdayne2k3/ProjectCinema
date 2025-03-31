import React from "react";

const ShowtimeList = () => {
  const showtimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];

  return (
    <div>
      <h2>Chọn suất chiếu</h2>
      <ul>
        {showtimes.map((time, index) => (
          <li key={index}>{time}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShowtimeList;
