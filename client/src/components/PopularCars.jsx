import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaCog, FaDollarSign, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PiEngine } from "react-icons/pi";
import { IoCarSportSharp } from "react-icons/io5";

function PopularCars({ cars }) {
  const totalCars = cars.length;
  const [currentIndex, setCurrentIndex] = useState(3);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const carGridRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    let timeout;
    if (currentIndex === totalCars + 3) {
      timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(3);
      }, 500);
    } else if (currentIndex === 2) {
      timeout = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(totalCars + 2);
      }, 500);
    } else {
      setTransitionEnabled(true);
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, totalCars]);

  // Updated calculateAverageRating function
  const calculateAverageRating = (car) => {
    const { performanceRating, styleRating, resaleValueRating, safetyRating } = car;
    const ratings = [performanceRating, styleRating, resaleValueRating, safetyRating]
      .map(r => parseFloat(r)) // Convert all ratings to numbers
      .filter(r => !isNaN(r)); // Filter out invalid numbers

    if (ratings.length === 0) return "No Rating"; // Return "No Rating" if no valid ratings are found
    const average = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
    return average.toFixed(1); // Return the average rating rounded to one decimal place
  };

  return (
    <div className="popular-cars">
      <h2>Your Recommended Cars</h2>
      <div className="car-slider-container">
        <button className="slider-btn prev" onClick={prevSlide}><FaChevronLeft /></button>
        <div className="car-slider">
          <div
            className="car-grid"
            style={{
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none',
            }}
            ref={carGridRef}
            onTransitionEnd={() => {
              if (!transitionEnabled) {
                setTransitionEnabled(true);
              }
            }}
          >
            {[...cars.slice(-3), ...cars, ...cars.slice(0, 3)].map((car, index) => (
              <div key={index} className="car-card">
                {/* <img src={car.imageUrl || 'https://via.placeholder.com/350x200'} alt={`${car.make} ${car.model}`} className="car-image" /> */}
                <h3>{car.make} {car.model}</h3>
                <div className="rating">
                  <FaStar className="star-icon" />
                  <span>{calculateAverageRating(car)}</span> {/* Display the average rating */}
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
                {/* <button className="rent-now-btn"> Find Listings →</button> */}
              </div>
            ))}
          </div>
        </div>
        <button className="slider-btn next" onClick={nextSlide}><FaChevronRight /></button>
      </div>
    </div>
  );
}

export default PopularCars;
