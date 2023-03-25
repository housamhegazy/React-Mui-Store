import { Add, Delete, Remove } from "@mui/icons-material";
import { Button,styled, IconButton, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Badge from "@mui/material/Badge";
import { deleteProducts } from "Redux/CartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 6px",
  },
}));

export default function Cart() {
  return (
    <Paper sx={{ width: 400, margin: "auto", p: 2 ,display:"flex",alignItems:"center"}}>
      <Button
      onClick={() => {
        deleteProducts();
      }}
        size="small"
        variant="contained"
        sx={{ textTransform: "capitalize" }}
      >
        delete
      </Button>
      <IconButton aria-label="delete" size="small">
        <Delete fontSize="small" color="error" />
      </IconButton>
      <Stack direction='row' sx={{alignItems:"center"}}>
        <Button sx={{mx:1}}>
          <Remove fontSize="small" />
        </Button>
        <StyledBadge badgeContent={2} color="secondary"/>
        <Button sx={{mx:1}}>
          <Add fontSize="small" />
        </Button>
        
      </Stack>
      <Typography>$ 1000 </Typography>
      <img style={{height:"70px"}} alt='img' src="##"/>
    </Paper>
  );
}
