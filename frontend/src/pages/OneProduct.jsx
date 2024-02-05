import React from "react";
import { useLoaderData } from "react-router-dom";
import "./OneProduct.css";

function OneProduct() {
  const product = useLoaderData();

  return (
    <div className="content-container">
      <div className="content-img">
        <div className="img-container">
          <img src={product.img_front} alt="" className="img-front" />
          <img src={product.img_back} alt="" className="img-front" />
          <img src={product.img_zoom} alt="" className="img-front" />
        </div>
      </div>
      <div className="text-container">
        <div className="title-price">
          <h1 className="one-title">{product.name}</h1>
          <h2 className="price-one"> {product.price}€</h2>
        </div>
        <h3>Detail du Produit :</h3>
        <div className="one-detail">
          <h4 className="one-description">
            {product.description.split("|").map((paragraph) => (
              <p key={product.slug}>{paragraph.trim()}</p>
            ))}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
