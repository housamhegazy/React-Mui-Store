import React from "react";
import Typography from "@mui/material/Typography";
import { Box, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  const theme = useTheme();
  return (
    <Box sx={{ height:"80vh",display: "flex" ,justifyContent:"center",alignItems:"center"}}>
      <Typography color={theme.palette.error.main} variant="h5">
        page not found
        <br />
        <br />
        go to <NavLink style={{color:theme.palette.text.primary}} to='/'>home </NavLink>
      </Typography>
    </Box>
  );
};

export default NotFound;