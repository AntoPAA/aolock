import React from "react";
import { useLoaderData } from "react-router-dom";

function OneProduct() {
  const product = useLoaderData();

  return (
    <div>
      <h1>{product.name}</h1>
      {product.description}
    </div>
  );
}

export default OneProduct;
