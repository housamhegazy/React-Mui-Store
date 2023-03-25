import { Add, MoreVert, Remove, ShoppingCart } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { addToCart, decreaseProducts, increaseProducts } from "Redux/CartSlice";
import { useGetproductsByNameQuery } from "../../Redux/products";
import { useSelector, useDispatch } from 'react-redux'

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 6px",
  },
}));

export default function Home() {
  const { data, error, isLoading } = useGetproductsByNameQuery();
  // @ts-ignore
  const insertedProducts = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  // const Quantity = insertedProducts.find(())
  if (error) {
    return <Typography>error...</Typography>;
  }
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (data) {
    return (
      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item) => {
          const { id, productName, description, imageLink, price } = item;
          return (
            <Card key={id} sx={{ maxWidth: 300, margin: 2 }}>
              <Typography sx={{ overflow: "hidden", p: 2 }}>
                {productName}
              </Typography>
              <CardMedia
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

                {insertedProducts.find((item)=>{item.id !== id})? 
                
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
              :
              <Stack direction="row" sx={{ alignItems: "center" }}>
              <Button onClick={() => {
                dispatch(decreaseProducts(item));
              }} sx={{ mx: 1 }}>
                <Remove fontSize="small" />
              </Button>
              <StyledBadge badgeContent={2} color="secondary" />
              <Button onClick={() => {
                dispatch(increaseProducts(item));
              }} sx={{ mx: 1 }}>
                <Add fontSize="small" />
              </Button>
            </Stack>
              }
                <Typography>$ {price}</Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
}
