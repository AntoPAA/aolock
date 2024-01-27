// ProductTypePage.jsx
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Allproducts from "../components/AllProductCard";

function ProductTypePage() {
  const { products, typeLabel } = useLoaderData();
  const [order, setOrder] = useState("pertinence");

  const changeOrder = (orders) => {
    setOrder(orders);
  };

  function sortProducts(product, sortOrder) {
    const orderProducts = [...product];

    orderProducts.sort((a, b) => {
      switch (sortOrder) {
        case "croissant":
          return a.price - b.price;
        case "decroissant":
          return b.price - a.price;
        case "pertinence":
          return a.id - b.id;
        default:
          return 0;
      }
    });

    return orderProducts;
  }
  return (
    <div>
      <h1>{typeLabel}</h1>
      <div>
        <div>trier par :</div>
        <select value={order} onChange={(e) => changeOrder(e.target.value)}>
          <option value="croissant">Tri croissant</option>
          <option value="decroissant">Tri décroissant</option>
          <option value="pertinence">Pertinence</option>
        </select>
      </div>
      <Allproducts products={sortProducts(products, order)} />
    </div>
  );
}

export default ProductTypePage;
