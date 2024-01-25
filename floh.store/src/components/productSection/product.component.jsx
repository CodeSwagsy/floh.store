import React, {useState} from 'react';
import {Link} from "react-router-dom";


export const ProductComponent = ({product}) => {
    const {name, description, price, images} = product;

    const [isHovered, setIsHovered] = useState(false);


    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <div
                className={`relative group opacity-${isHovered ? "120" : "00"}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="bg-white p-4 border rounded-lg overflow-hidden">
                    <div className="flex justify-center mb-3">
                        <img
                            src={images[0]}
                            alt={name}
                            className="w-full h-60 object-cover rounded mb-3"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl md:text-2xl lg:text-3xl mb-2">{name}</h3>
                        <p className="text-sm md:text-base lg:text-lg mb-2 h-20 overflow-hidden">
                            {description}
                        </p>
                        <p className="font-bold text-base md:text-lg lg:text-xl mb-2">{`Price: $${price}`}</p>
                        <Link to={`/products/${product._id}`}
                              className="`bg-white text-gray-800 border border-gray-800 px-5 py-2 rounded mt-4 transition-colors hover:bg-green-400 hover:text-white hover:border-green-400 text-gray-800 border-gray-800">
                            View Details
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};
