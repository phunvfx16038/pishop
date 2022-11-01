import React, { useState, useEffect } from "react";
import "./slider.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
function Slider({ sliderItem }) {
  const [screen, setScreen] = useState(window.innerWidth);

  useEffect(() => {
    setScreen(window.innerWidth);
  }, []);
  return (
    <>
      {screen > 768 ? (
        <Splide
          options={{
            perPage: 3,
            height: "80vh",
            rewind: true,
            gap: "1.5rem",
            perMove: 1,
            pagination: false,
            arrows: false,
            type: "loop",
            autoplay: "playing",
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
      ) : (
        <Splide
          options={{
            perPage: 1,
            height: "80vh",
            rewind: true,
            gap: "1.5rem",
            perMove: 1,
            pagination: false,
            arrows: false,
            type: "loop",
            autoplay: "playing",
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
      )}
    </>
  );
}

export default Slider;
