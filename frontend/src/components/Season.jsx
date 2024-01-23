import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

function Season({ products }) {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

Season.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Season;
