import React from "react";
import { Link, useLoaderData } from "react-router-dom";

function OneProduct() {
  const product = useLoaderData();

  return (
    <div>
      <h1>{product.name}</h1>
      {product.description}
      <Link to={`/products/${product.id}`}>
        <h2 className="card-name">{product.name}</h2>
      </Link>
    </div>
  );
}

export default OneProduct;
