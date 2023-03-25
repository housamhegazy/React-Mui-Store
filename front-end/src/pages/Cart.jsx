import { Add, Remove } from "@mui/icons-material";
import { Button,styled, IconButton, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 6px",
  },
}));

export default function Cart() {
  return (
    <Paper sx={{ width: 300, margin: "auto", p: 2 ,display:"flex",alignItems:"center"}}>
      <Button
        size="small"
        variant="contained"
        sx={{ textTransform: "capitalize" }}
      >
        delete
      </Button>
      {/* <IconButton aria-label="delete" size="small">
        <Delete fontSize="small" />
      </IconButton> */}
      <Stack direction='row' sx={{alignItems:"center"}}>
        <Button sx={{mx:1}}>
          <Remove fontSize="small" />
        </Button>
        <StyledBadge badgeContent={2} color="secondary"/>
        <Button sx={{mx:1}}>
          <Add fontSize="small" />
        </Button>
        <img style={{height:"70px"}} alt='img' src="##"/>
      </Stack>
    </Paper>
  );
}
