import React from 'react';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Car from './Car'

const CarsList = ({ cars = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  if (cars.length === 0) {
    return null
  }

  return (
    <div className="popular-cars">
      <h2>Your Recommended Cars</h2>
      <Slider {...settings}>
        {cars.map(car => (
          <Car key={car.id} car={car} />
        ))}
      </Slider>
    </div>
  );
};

export default CarsList;
