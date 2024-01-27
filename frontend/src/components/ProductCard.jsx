import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="card-container">
      <Link to={`/products/${product.id}`}>
        <img className="card-img" src={product.img_front} alt="img-front" />
        <h2 className="card-name">{product.name}</h2>
      </Link>
      <h3 className="card-price">{product.price}</h3>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img_front: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
