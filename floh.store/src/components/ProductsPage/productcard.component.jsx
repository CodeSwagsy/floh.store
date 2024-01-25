import {useState} from "react";
import {Link} from "react-router-dom";

export const ProductCard = ({ product }) => {
    const { title, category, condition, price, description, location, images } =
        product;

    const [isHovered, setIsHovered] = useState(false);


    return (
        <div
            className={`bg-gray-100 p-4 border rounded-lg hover:shadow-md transition duration-300 mb-4 flex flex-col justify-between ${
                isHovered ? "shadow-md" : ""
            }`}
        >
            <div className="flex justify-center mb-3 h-1/3">
                <img src={images[0]} alt={title} className="object-cover rounded" />
            </div>
            <div className="text-center flex flex-col">
                <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2">
                    {title}
                </h3>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">{`Kategorie: ${category}`}</p>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">{`Zustand: ${condition}`}</p>
                <p className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl mb-2">{`Preis: ${price} €`}</p>
                <p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl mb-2 line-clamp-4">{`${description}`}</p>
                <p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl mb-2">{`Location: ${location.city}, ${location.zip}`}</p>
                <Link to={`/products/${product._id}`}
                      className={`bg-green-500 text-white px-5 py-2 rounded mt-4 ${
                          isHovered ? "bg-green-600" : "bg-gray-800"
                      }`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};