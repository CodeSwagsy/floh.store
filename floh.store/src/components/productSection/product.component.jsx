import React, { useState } from 'react';

export const ProductComponent = ({ product, style }) => {
    const { name, description, price, image } = product;

    const [isHovered, setIsHovered] = useState(false);

    const handleViewDetails = () => {
        // Add logic to navigate to a detailed product page or show a modal
        alert(`View details for ${name}`);
    };

    return (
        <div className={`bg-gray-100 p-4 border rounded-lg hover:shadow-md transition duration-300 ${style}`}>
            <div className="flex justify-center mb-3">
                <img src={image} alt={name} className="w-40 h-40 rounded" />
            </div>
            <div className="text-center">
                <h3 className="text-xl md:text-2xl lg:text-3xl mb-2">{name}</h3>
                <p className="text-sm md:text-base lg:text-lg mb-2">{description}</p>
                <p className="font-bold text-base md:text-lg lg:text-xl mb-2">{`Price: $${price}`}</p>
                <button
                    className={`bg-green-500 text-white px-5 py-2 rounded mt-4 ${isHovered ? 'bg-green-600' : 'bg-gray-800'}`}
                    onClick={handleViewDetails}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};
