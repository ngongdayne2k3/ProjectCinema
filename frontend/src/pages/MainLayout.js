import React from "react";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import MovieIcon from "@mui/icons-material/Movie";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const menuItems = [
  { text: "Quản lý phim", icon: <MovieIcon />, path: "/admin/movies" },
  { text: "Quản lý lịch chiếu", icon: <EventSeatIcon />, path: "/schedules" },
  { text: "Quản lý phòng chiếu", icon: <TheatersIcon />, path: "/rooms" },
  { text: "Quản lý đặt vé", icon: <ConfirmationNumberIcon />, path: "/bookings" },
  { text: "Quản lý nhân viên", icon: <PeopleIcon />, path: "/staff" },
  { text: "Quản lý thành viên", icon: <GroupIcon />, path: "/members" },
  { text: "Báo cáo", icon: <BarChartIcon />, path: "/dashboard" },
];

const MainLayout = ({ children, hideHeader = false, hideSidebar = false }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <Box display="flex" flexDirection="column">
      {/* Header - Chỉ hiển thị nếu hideHeader là false */}
      {!hideHeader && <Header />}

      {/* Sidebar và nội dung chính */}
      <Box display="flex">
        {!hideSidebar && (
          <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0 }}>
            <List sx={{ width: 240 }}>
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path; // Kiểm tra xem mục có đang active không
                return (
                  <ListItem
                    button
                    key={index}
                    onClick={() => navigate(item.path)}
                    sx={{
                      backgroundColor: isActive ? "#1976d2" : "transparent", // Màu nền khi active
                      color: isActive ? "white" : "black", // Màu chữ khi active
                      "&:hover": {
                        backgroundColor: isActive ? "#1565c0" : "#f0f0f0", // Hiệu ứng hover
                        color: isActive ? "white" : "black",
                      },
                      "& .MuiListItemIcon-root": {
                        color: isActive ? "white" : "inherit", // Màu icon khi active
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                );
              })}
            </List>
          </Drawer>
        )}

        {/* Nội dung chính */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: hideSidebar ? 0 : 30 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;