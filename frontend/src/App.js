// App.js
import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Quản lý người dùng (User)
=======
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Import các trang
>>>>>>> main
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
<<<<<<< HEAD

// Quản lý rạp phim (Admin)
import Dashboard from "./pages/Dashboard";
import MovieList from "./pages/MovieList"; // Dành cho user
import MovieListAdmin from "./pages/MovieListAdmin"; // Dành cho admin
=======
import MovieList from "./pages/MovieList";
import Dashboard from "./pages/Dashboard";
import MovieListAdmin from "./pages/MovieListAdmin";
>>>>>>> main
import ShowSchedule from "./pages/ShowSchedule";
import ScreenRooms from "./pages/ScreenRooms";
import Seats from "./pages/Seats";

<<<<<<< HEAD
// Navbar
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
=======
// Import Headers
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";

function Layout() {
  const location = useLocation();

  // Danh sách các route sử dụng AdminHeader
  const adminRoutes = ["/dashboard", "/admin/movies", "/schedules", "/rooms"];
  const isAdminRoute = adminRoutes.includes(location.pathname);

  return (
    <>
      {isAdminRoute ? <AdminHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/ticket-send" element={<TicketSend />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/history" element={<BookingHistory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/movies" element={<MovieListAdmin />} />
        <Route path="/schedules" element={<ShowSchedule />} />
        <Route path="/rooms" element={<ScreenRooms />} />
        <Route path="/seats/:roomId" element={<Seats />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="*" element={<div>404 - Trang không tồn tại</div>} />
      </Routes>
    </>
  );
}
>>>>>>> main

function App() {
  return (
    <Router>
<<<<<<< HEAD
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
        <Route path="*" element={<NotFound />} />
      </Routes>
=======
      <Layout />
>>>>>>> main
    </Router>
  );
}

export default App;