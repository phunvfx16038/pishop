import React, { useState } from "react";
import "./slider.css";
import Carousel from "react-bootstrap/Carousel";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link, useNavigate } from "react-router-dom";
function Slider({ sliderItem }) {
  const navigate = useNavigate();
  const handleClick = (id, state) => {
    navigate(`/products/${id}`, { state });
  };

  return (
    // <Carousel activeIndex={index} onSelect={handleSelect}>
    //   {sliderItem.map((item) => (
    //     <Carousel.Item key={item._id}>
    //       <img
    //         className="d-block w-100"
    //         src={item.thumbnail}
    //         alt={item.title}
    //       />
    //       <Carousel.Caption>
    //         <h3>{item.title}</h3>
    //         <p>{item.description}</p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //   ))}
    // </Carousel>
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
