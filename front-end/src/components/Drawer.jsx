import * as React from "react";
import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Badge from "@mui/material/Badge";

import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Drawerr({
  handleDrawerToggle,
  mobileOpen,
  drawerWidth,
  theme,
  setmyMOde,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const myList = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    {
      name: "Cart",
      icon: (
        <StyledBadge badgeContent={2} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      ),

      path: "/cart",
    },
  ];
  const drawer = (
    <div>
      <ListItem
        sx={{ display: "flex", justifyContent: "center", my: "10px" }}
        disablePadding
      >
        <IconButton
          onClick={() => {
            localStorage.setItem(
              "currentMode",
              theme.palette.mode === "dark" ? "light" : "dark"
            );

            setmyMOde(theme.palette.mode === "light" ? "dark" : "light");
          }}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7 sx={{ color: "orange" }} />
          ) : (
            <Brightness4 />
          )}
        </IconButton>
      </ListItem>

      <Divider />

      <List>
        {myList.map((item) => (
          <ListItem
            sx={{
              backgroundColor:
                location.pathname === item.path && theme.palette.action.focus,
            }}
            key={item.name}
            disablePadding
            onClick={() => {
              navigate(item.path);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
