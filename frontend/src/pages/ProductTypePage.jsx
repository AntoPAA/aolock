import React from "react";
import { useLoaderData } from "react-router-dom";
import Allproducts from "../components/AllProductCard";

function ProductTypePage() {
  const { products, typeLabel } = useLoaderData();
  return (
    <div>
      <h1>{typeLabel}</h1>
      ProductTypePage
      <Allproducts products={products} />
    </div>
  );
}

export default ProductTypePage;
