import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import SeatSelection from "./pages/SeatSelection";
import Confirmation from "./pages/Confirmation";
import TicketSend from "./pages/TicketSend";

function App() {
  return (
    <Router>
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
        <Route path="/history" element={<BookingHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
