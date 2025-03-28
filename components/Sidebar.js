import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import MovieIcon from "@mui/icons-material/Movie";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";

const Sidebar = () => {
  const menuItems = [
    { text: "Quản lý phim", icon: <TheatersIcon /> },
    { text: "Quản lý lịch chiếu", icon: <EventSeatIcon /> },
    { text: "Quản lý phòng chiếu", icon: <MovieIcon /> },
    { text: "Quản lý đặt vé", icon: <ConfirmationNumberIcon /> },
    { text: "Quản lý nhân viên", icon: <PeopleIcon /> },
    { text: "Quản lý thành viên", icon: <GroupIcon /> },
    { text: "Báo cáo", icon: <BarChartIcon /> },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
