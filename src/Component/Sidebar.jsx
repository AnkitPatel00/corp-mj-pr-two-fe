import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Leads", icon: <GroupIcon />, path: "/leads" },
  { text: "Sales", icon: <CheckCircleIcon />, path: "/sales" },
  { text: "Agents", icon: <HeadsetMicIcon />, path: "/agents" },
  { text: "Reports", icon: <BarChartIcon />, path: "/reports" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#1A237E",
        color: "white",
        p: 2,
        boxShadow: "4px 0 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Responsive font size and padding to prevent overflow
        fontSize: {
          xs: "0.8rem",
          sm: "0.9rem",
          lg: "1rem",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 2, fontSize: "inherit" }}
      >
        Anvaya CRM
      </Typography>
      <Divider
        sx={{ width: "80%", backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      />

      {location.pathname === "/" ? (
        <List sx={{ width: "100%" }}>
          {navItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              component={NavLink}
              to={item.path}
              sx={{
                "&.active .MuiListItemButton-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                color: "white",
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ width: "100%", mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            component={NavLink}
            to="/"
            startIcon={<DashboardIcon />}
            sx={{
              mb: 2,
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#388E3C" },
              fontSize: "inherit",
            }}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.5)",
              "&:hover": { borderColor: "white" },
              fontSize: "inherit",
            }}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
