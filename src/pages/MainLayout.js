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

const menuItems = [
  { text: "Quản lý phim", icon: <MovieIcon /> },
  { text: "Quản lý lịch chiếu", icon: <EventSeatIcon /> },
  { text: "Quản lý phòng chiếu", icon: <TheatersIcon /> },
  { text: "Quản lý đặt vé", icon: <ConfirmationNumberIcon /> },
  { text: "Quản lý nhân viên", icon: <PeopleIcon /> },
  { text: "Quản lý thành viên", icon: <GroupIcon /> },
  { text: "Báo cáo", icon: <BarChartIcon /> },
];

const MainLayout = ({ children, hideHeader = false, hideSidebar = false }) => {
  return (
    <Box display="flex" flexDirection="column">
      {/* Header - Chỉ hiển thị nếu hideHeader là false */}
      {!hideHeader && <Header />}

      {/* Sidebar và nội dung chính */}
      <Box display="flex">
        {!hideSidebar && (
          <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0 }}>
            <List sx={{ width: 240 }}>
              {menuItems.map((item, index) => (
                <ListItem button key={index}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
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