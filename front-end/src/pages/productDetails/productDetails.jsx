import React, { useRef, useState } from "react";
import { useGetoneproductsByNameQuery } from "../../Redux/products";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import DetailsThumb from "./productDetailsThumb";
import { Remove, Add, ShoppingCart } from "@mui/icons-material";
import { Stack,Typography, Badge, Button, styled } from "@mui/material";
import { decreaseProducts, increaseProducts, addToCart } from "Redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 6px",
  },
}));

export default function ProductDetails() {
  let userId = useParams();
  const { data, error, isLoading } = useGetoneproductsByNameQuery(
    Number(userId.id)
  );
  const dispatch = useDispatch();
  // @ts-ignore
  const { insertedProducts } = useSelector((state) => state.counter);

  const Quantity = (id) => {
    const myproduct = insertedProducts.find((product) => product.id === id);
    return myproduct.Quantity;
  };
  const [index, setIndex] = useState(0);
  const myRef = useRef(null);
  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  if (error) {
    return <Typography>error...</Typography>;
  }
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (data) {
    return (
      <div className="app productdetails">
        <div className="details" key={data.id}>
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productname}</h2>
              <span>${data.price}</span>
            </div>
            {/* <Colors colors={data.colors} /> */}

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {insertedProducts.find((product) => product.id === data.id) ? (
              <Stack direction="row" sx={{ alignItems: "center" ,mt:3}}>
                <Button
                  size="small"
                  onClick={() => {
                    dispatch(decreaseProducts(data));
                  }}
                  sx={{ mx: 1 }}
                >
                  <Remove fontSize="small" />
                </Button>
                <StyledBadge
                  badgeContent={Quantity(data.id)}
                  color="secondary"
                />
                <Button
                  size="small"
                  onClick={() => {
                    dispatch(increaseProducts(data));
                  }}
                  sx={{ mx: 1 }}
                >
                  <Add fontSize="small" />
                </Button>
              </Stack>
            ) : (
              <Button
                onClick={() => {
                  dispatch(addToCart(data));
                }}
                size="small"
                sx={{ textTransform: "capitalize",mt:2 }}
                variant="contained"
              >
                <ShoppingCart />
                add to Basket
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
