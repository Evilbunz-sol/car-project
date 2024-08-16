import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaCog, FaDollarSign, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PiEngine } from "react-icons/pi";
import { IoCarSportSharp } from "react-icons/io5";


function PopularCars({ cars }) {
  const initialState = cars.map((car, index) => ({
    ...car,
    active: index < 3, // First 3 cars active initially
    idx: index,
    pos: index + 1
  }));

  const [cardState, setCardState] = useState(initialState);

  const handleLeftClick = () => {
    const prevState = [...cardState];
    // find next inactive card index - top
    const nextCardIdx = prevState
      .filter((ft) => ft.active === true)
      .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))[0].idx;
    // reset
    prevState.find((f) => f.active === false).active = true;
    // update
    prevState.find((f) => f.idx === nextCardIdx).active = false;
    // maximize pos
    prevState.find((f) => f.idx === nextCardIdx).pos =
      Math.max.apply(
        null,
        prevState.map(function (o) {
          return o.pos;
        })
      ) + 1;

    // update state
    setCardState(prevState);
  };

  const handleRightClick = () => {
    const prevState = [...cardState];
    // find next inactive card index - bottom
    const nextCardIdx = prevState
      .filter((ft) => ft.active === true)
      .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))
      .pop(1).idx;
    // minimize pos
    prevState.find((f) => f.active === false).pos =
      Math.min.apply(
        null,
        prevState.map(function (o) {
          return o.pos;
        })
      ) - 1;
    // reset
    prevState.find((f) => f.active === false).active = true;
    // update
    prevState.find((f) => f.idx === nextCardIdx).active = false;

    // update state
    setCardState(prevState);
  };

  const calculateAverageRating = (car) => {
    const { performanceRating, styleRating, resaleValueRating, safetyRating } = car;
    const ratings = [performanceRating, styleRating, resaleValueRating, safetyRating]
      .map(r => parseFloat(r))
      .filter(r => !isNaN(r));

    if (ratings.length === 0) return "No Rating";
    const average = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
    return average.toFixed(1);
  };

  return (
    <div className="popular-cars">
      <h2>Your Recommended Cars</h2>
      <div className="car-slider-container">
        <button className="slider-btn prev" onClick={handleRightClick}><FaChevronLeft /></button>
        <div className="car-slider car-grid">
          {cardState
            .filter((f) => f.active === true)
            .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))
            .map((car, index) => (
              <div key={index} className="car-card">
                <h3>{car.make} {car.model}</h3>
                <div className="rating">
                  <FaStar className="star-icon" />
                  <span>{calculateAverageRating(car)}</span>
                </div>
                <div className="car-features">
                  <div><PiEngine /> {car.performanceRating || "No Rating"} Performance</div>
                  <div><IoCarSportSharp /> {car.styleRating || "No Rating"} Style </div>
                  <div><FaCog /> {car.safetyRating || "No Rating"} Safety </div>
                  <div><FaDollarSign /> {car.resaleValueRating || "No Rating"} Resale</div>
                </div>
                <div className="car-price">
                  <span>Price</span>
                  <span className="price">${car.price?.toLocaleString() || 'Not Available'}</span>
                </div>
              </div>
            ))}
        </div>
        <button className="slider-btn next" onClick={handleLeftClick}><FaChevronRight /></button>
      </div>
    </div>
  );
}

export default PopularCars;

  