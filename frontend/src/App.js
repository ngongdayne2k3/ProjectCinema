import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Quản lý người dùng (User)
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import SeatSelection from "./pages/SeatSelection";
import Confirmation from "./pages/Confirmation";
import TicketSend from "./pages/TicketSend";
import Promotions from "./pages/Promotions";

// Quản lý rạp phim (Admin)
import Dashboard from "./pages/Dashboard";
import MovieList from "./pages/MovieList"; // Dành cho user
import MovieListAdmin from "./pages/MovieListAdmin"; // Dành cho admin
import ShowSchedule from "./pages/ShowSchedule";
import ScreenRooms from "./pages/ScreenRooms";
import Seats from "./pages/Seats";

// Navbar
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Trang chính */}
        <Route path="/" element={<Booking />} />

        {/* Chức năng đặt vé */}
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/ticket-send" element={<TicketSend />} />

        {/* Quản lý khách hàng & thành viên */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/history" element={<BookingHistory />} />

        {/* Trang quản trị Admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/movies" element={<MovieListAdmin />} />
        <Route path="/schedules" element={<ShowSchedule />} />
        <Route path="/rooms" element={<ScreenRooms />} />
        <Route path="/seats/:roomId" element={<Seats />} />

        {/* Trang dành cho user */}
        <Route path="/movies" element={<MovieList />} />

        {/* Trang lỗi */}
        <Route path="*" element={<div>404 - Trang không tồn tại</div>} />
      </Routes>
    </Router>
  );
}

export default App;
