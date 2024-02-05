import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";
import "./Carrousel.css";
import Group1 from "../public/Group1.png";

function Carrousel({ products }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div>
      <div className="img-carrousel">
        <Link to="/products/type/1">
          <img className="img-carrousel" src={Group1} alt="" />
        </Link>
      </div>
      <div className="carousel-wrapper">
        <Slider
          infinite={settings.infinite}
          speed={settings.speed}
          slidesToScroll={settings.slidesToScroll}
          slidesToShow={settings.slidesToShow}
          initialSlide={settings.initialSlide}
          autoplay={settings.autoplay}
          autoplaySpeed={settings.autoplaySpeed}
        >
          {products.map((product) => (
            <div key={product.id} className="carousel-slide">
              <ProductCard product={product} cardStyle="card-carrousel" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

Carrousel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Carrousel;
