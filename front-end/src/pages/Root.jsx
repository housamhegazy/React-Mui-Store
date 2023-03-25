import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Appbar from "../components/AppBar";
import Drawerr from "../components/Drawer";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getDesignTokens from "../styles/Theme";
import { useMemo } from "react";
const drawerWidth = 240;
export default function Root() {
  //start dark mood functions
  const [mode, setmyMOde] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );
  //end dark mood

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  //open and close drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  //end drawer

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Appbar {...{ handleDrawerToggle, drawerWidth }} />
        <Drawerr
          {...{ handleDrawerToggle, mobileOpen, drawerWidth, theme, setmyMOde }}
        />
        <Box
          sx={{
            width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px )` },
            ml: { xs: 0, sm: `${drawerWidth}px` },
            p:2
          }}
        >
          <Outlet />
        </Box>
      </div>
    </ThemeProvider>
  );
}
