import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";
import "./Carrousel.css";

function Carrousel({ products }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 6,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
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
          <div key={product.id}>
            <ProductCard product={product} cardStyle="card-carrousel" />
          </div>
        ))}
      </Slider>
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
