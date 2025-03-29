// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Import các trang
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
import MovieList from "./pages/MovieList";
import Dashboard from "./pages/Dashboard";
import MovieListAdmin from "./pages/MovieListAdmin";
import ShowSchedule from "./pages/ShowSchedule";
import ScreenRooms from "./pages/ScreenRooms";
import Seats from "./pages/Seats";

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

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;