import { MoreVert, ShoppingCart } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useGetproductsByNameQuery } from "../../Redux/products";

export default function Home() {
  const { data, error, isLoading } = useGetproductsByNameQuery();
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
            <Card key={id} sx={{ maxWidth: 300 ,margin:2}}>
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
                <Button
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
                >
                  <ShoppingCart />
                  add to Basket
                </Button>
                <Typography>$ {price}</Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
}
