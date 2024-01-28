import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductTypeFilter from "../components/ProductTypeFilter";

function ProductTypePage() {
  const { typeLabel } = useLoaderData();

  return (
    <div>
      <h1>{typeLabel}</h1>
      <ProductTypeFilter />
    </div>
  );
}

export default ProductTypePage;
