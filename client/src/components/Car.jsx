import React from 'react';
import { FaStar } from 'react-icons/fa';

const Car = ({ car }) => {
    return (
        <div className="car-card">
            {car.image_urls && car.image_urls.length > 0 && (
                <img
                    src={car.image_urls[0]}
                    alt={`${car.make} ${car.model}`}
                    className="car-image"
                />
            )}
            <h3>{car.make} {car.model}</h3>
            <div className="rating">
                <FaStar className="star-icon" />
            </div>
            <div className="car-price">
                <span>Price</span>
                <span className="price">${car.base_msrp?.toLocaleString() || 'Not Available'}</span>
            </div>
        </div>
    )
}

export default Car;
