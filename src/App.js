import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MovieList from "./pages/MovieList";
import ShowSchedule from "./pages/ShowSchedule";
import ScreenRooms from "./pages/ScreenRooms";
import Seats from "./pages/Seats";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/schedules" element={<ShowSchedule />} />
        <Route path="/rooms" element={<ScreenRooms />} />
        <Route path="/seats/:roomId" element={<Seats />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div>404 - Trang không tồn tại</div>} />
      </Routes>
    </Router>
  );
}

export default App;