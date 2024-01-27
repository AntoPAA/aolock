import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function Allproducts({ products }) {
  return (
    <Link to={`/products/${products.id}`}>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </Link>
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
