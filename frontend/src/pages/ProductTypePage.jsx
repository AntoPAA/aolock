import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductTypeFilter from "../components/ProductTypeFilter";
import "./ProductTypePage.css";

function ProductTypePage() {
  const { typeLabel } = useLoaderData();

  return (
    <div className="container-carde">
      <h1 className="title-type">{typeLabel}</h1>
      <h2 className="subtitle-type">DECOUVREZ TOUS NOS {typeLabel} UNISEXE.</h2>
      <div className="container-filter">
        <ProductTypeFilter />
      </div>
    </div>
  );
}

export default ProductTypePage;
