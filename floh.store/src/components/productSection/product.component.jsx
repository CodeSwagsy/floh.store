import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Tooltip} from "../ProductsPage/Tooltip.component.jsx";


export const ProductComponent = ({product}) => {
    const {title, category, condition, price, description, location, images} =
        product;

    return (
        <div className="w-full  bg-gray-100 p-2 lg:p-4 max-lg:mx-12 border rounded-lg hover:shadow-md mb-4 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex justify-center mb-2 lg:h-1/3">
                <img src={images[0]} alt={title} className="object-cover rounded"/>
            </div>
            <div className="text-center flex flex-col items-center">
                <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2">
                    {title}
                </h3>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Kategorie: ${category}`}</p>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Zustand: ${condition}`}</p>
                <p className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl mb-2">{`Preis: ${price} €`}</p>
                <p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2 line-clamp-4">{`${description}`}</p>
                <p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`PLZ / Ort: ${location.city}, ${location.zip}`}</p>

                <Link
                    to={`/products/${product._id}`}
                    className={`bg-green-500 text-white px-5 py-2 rounded mt-4 bg-emerald hover:bg-springgreen transition-all w-full`}
                >
                    Produkt anzeigen
                </Link>
            </div>
        </div>
)
    ;
};
