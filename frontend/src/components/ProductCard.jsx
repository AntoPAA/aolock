import React from "react";
import PropTypes from "prop-types";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="card-container">
      <img className="card-img" src={product.img_front} alt="img-front" />
      <h2 className="card-name">{product.name}</h2>
      <h3 className="card-price">{product.price}</h3>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    img_front: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
