import React from "react";
import { useLoaderData } from "react-router-dom";

function OneProduct() {
  const product = useLoaderData();
  return <div>{product.name}</div>;
}

export default OneProduct;
