import React from "react";
import "./slider.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link, useNavigate } from "react-router-dom";
function Slider({ sliderItem }) {
  return (
    <Splide
      options={{
        perPage: 3,
        height: "80vh",
        rewind: true,
        gap: "1.5rem",
        perMove: 1,
        pagination: false,
        arrows: false,
      }}
      aria-labelledby="basic-example-heading"
    >
      {sliderItem.map((product, index) => (
        <SplideSlide key={index}>
          <Link to={`/products/${product._id}`} state={{ product }}>
            <img src={product.thumbnail} alt={product.title} />
          </Link>
        </SplideSlide>
      ))}
    </Splide>
  );
}

export default Slider;
