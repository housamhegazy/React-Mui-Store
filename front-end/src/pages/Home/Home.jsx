import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";
import {
  addToCart,
  decreaseProducts,
  increaseProducts,
} from "../../Redux/CartSlice";
import { useGetproductsByNameQuery } from "../../Redux/products";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 6px",
  },
}));

export default function Home() {
  const { data, error, isLoading } = useGetproductsByNameQuery();

  const dispatch = useDispatch();
  // @ts-ignore
  const { insertedProducts } = useSelector((state) => state.counter);
  const navigate = useNavigate();
  const Quantity = (id) => {
    const myproduct = insertedProducts.find((product) => product.id === id);
    return myproduct.Quantity;
  };
  if (error) {
    return <Typography>error...</Typography>;
  }
  if (isLoading) {
    return (
      <Box sx={{ height:"80vh",display: "flex" ,justifyContent:"center",alignItems:"center"}}>
        <Helmet>
          <title>loading ...</title>
        </Helmet>
        <CircularProgress />
      </Box>
    );
  }
  if (data) {
    return (
      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        <Helmet>
          <title>META store</title>
          <meta name="products" content={"largest store in usa"} />
        </Helmet>
        {data.map((item) => {
          const { id, productName, description, imageLink, price } = item;
          return (
            <Card key={id} sx={{ maxWidth: 300, margin: 2 }}>
              <Typography sx={{ overflow: "hidden", p: 2 }}>
                {productName}
              </Typography>
              <CardMedia
                onClick={() => {
                  navigate(`productdetails/${id}`);
                }}
                component="img"
                height="194"
                image={imageLink[0]}
                alt="Paella dish"
              />
              <CardContent sx={{ overflow: "hidden" }}>
                <Typography
                  className="wrapText"
                  variant="body2"
                  color="text.secondary"
                >
                  {description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between" }}
                disableSpacing
              >
                {insertedProducts.find((product) => product.id === id) ? (
                  <Stack direction="row" sx={{ alignItems: "center" }}>
                    <Button
                      size="small"
                      onClick={() => {
                        dispatch(decreaseProducts(item));
                      }}
                      sx={{ mx: 1 }}
                    >
                      <Remove fontSize="small" />
                    </Button>
                    <StyledBadge
                      badgeContent={Quantity(id)}
                      color="secondary"
                    />
                    <Button
                      size="small"
                      onClick={() => {
                        dispatch(increaseProducts(item));
                      }}
                      sx={{ mx: 1 }}
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
                <Typography>$ {price}</Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
}
