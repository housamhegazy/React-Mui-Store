import React from "react";
import { useGetoneproductsByNameQuery } from "../../Redux/products";
import { useParams } from "react-router-dom";
export default function ProductDetails() {
    let userId = useParams();
  const { data, error, isLoading } = useGetoneproductsByNameQuery(Number(userId.id));

  if (data) {
    console.log(data)
    return <div>productDetails</div>;
  }
}
