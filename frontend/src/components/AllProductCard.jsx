import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

function Allproducts({ products }) {
  return (
    <div className="container-card">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

Allproducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      img_front: PropTypes.string.isRequired,
      img_back: PropTypes.string.isRequired,
      img_zoom: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Allproducts;
