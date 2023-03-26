import { Add, Delete, Remove, ShoppingCart } from "@mui/icons-material";
import {
  Button,
  styled,
  IconButton,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Badge from "@mui/material/Badge";
import {
  addToCart,
  decreaseProducts,
  deleteProducts,
  increaseProducts,
} from "Redux/CartSlice";
import { useSelector, useDispatch } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 6px",
  },
}));

export default function Cart() {
  // @ts-ignore
  const { insertedProducts } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  let totalPrice =0;
  let totalQuantity =0;

  if(insertedProducts.length === 0){
    return(
      <Paper sx={{width:"200px",mx:"auto",p:"10px"}}>cart is empty  😞 😞 </Paper>
    )
  }

  return (
    <Box>
      
      {insertedProducts.map((item) => {

        const { id, productName, imageLink, price, Quantity } =
          item;
          totalPrice += price * Quantity 
          totalQuantity += Quantity
        return (
          <Paper
            key={id}
            sx={{
              maxWidth: {xs:300,sm:320,md:400},
              margin: "auto",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent:"space-between",
              mb:2
            }}
          >
            <Button
              onClick={() => {
                dispatch(deleteProducts(item));
              }}
              size="small"
              variant="contained"
              sx={{
                display: { xs: "none", sm: "block" },
                textTransform: "capitalize",
              }}
            >
              delete
            </Button>

            <IconButton
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={() => {
                dispatch(deleteProducts(item));
              }}
              aria-label="delete"
              size="small"
            >
              <Delete fontSize="small" color="error" />
            </IconButton>

            {insertedProducts.find((product) => product.id === id) ? (
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Button
                  size="small"
                  
                  onClick={() => {
                    dispatch(decreaseProducts(item));
                  }}
                  sx={{ mx:{sm:1} ,p:{xs:0,sm:"auto"},minWidth:"40px" }}
                >
                  <Remove fontSize="small" />
                </Button>
                <StyledBadge badgeContent={Quantity} color="secondary" />
                <Button
                  size="small"
                  onClick={() => {
                    dispatch(increaseProducts(item));
                  }}
                  sx={{ mx:{sm:1} ,p:{xs:0,sm:"auto"},minWidth:"40px" }}
                >
                  <Add fontSize="small" />
                </Button>
              </Stack>
            ) : (
              <Button
                onClick={() => {
                  dispatch(addToCart(item));
                }}
                size="small"
                sx={{ textTransform: "capitalize" }}
                variant="contained"
              >
                <ShoppingCart />
                add to Basket
              </Button>
            )}

            <Typography sx={{fontSize:{xs:"14px",sm:"16px"}}}>$ {price * Quantity} </Typography>
            <img
              style={{ height: "70px" }}
              alt={productName}
              src={imageLink[0]}
            />
          </Paper>
        );
      })}
      <Paper sx={{width:"200px",mx:"auto",p:"10px"}}>
        <Stack direction='row' sx={{justifyContent:"space-between",my:2}}>
          <Typography>subTotal price</Typography>
          <Typography>$ {totalPrice}</Typography>
        </Stack>
        <Stack direction='row' sx={{justifyContent:"space-between",my:2}}>
          <Typography>pieces </Typography>
          <Typography>{totalQuantity}</Typography>
        </Stack>
        <Button sx={{mt:2,mx:"auto",display:'block'}} variant='contained'>checkOut</Button>
      </Paper>

    </Box>
  );
}
