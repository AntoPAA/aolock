import React from "react";
import { useLoaderData } from "react-router-dom";
import Allproducts from "../components/AllProductCard";

function ProductTypePage() {
  const products = useLoaderData();
  return (
    <div>
      ProductTypePage
      <Allproducts products={products} />
    </div>
  );
}

export default ProductTypePage;
