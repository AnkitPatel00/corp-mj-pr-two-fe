import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(45deg, #1A237E 30%, #283593 90%)",
        color: "white",
        py: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Anvaya CRM
      </Typography>
    </Box>
  );
};

export default Header;
