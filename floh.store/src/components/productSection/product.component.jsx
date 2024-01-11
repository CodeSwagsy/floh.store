import React, {useState} from 'react';

export const ProductComponent = ({product}) => {
    const {name, description, price, image} = product;

    const [isHovered, setIsHovered] = useState(false);

    const handleViewDetails = () => {
        // Add logic to navigate to a detailed product page or show a modal
        alert(`View details for ${name}`);
    };

    return (
        <div className="bg-gray-100 p-4 border rounded-lg hover:shadow-md transition duration-300">
            <img src={image} alt={name} className="w-40 h-40 mb-3 rounded"/>
            <div className="text-center">
                <h3>{name}</h3>
                <p>{description}</p>
                <p className="font-bold">{`Price: $${price}`}</p>
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


