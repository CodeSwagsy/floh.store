import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Tooltip} from "../ProductsPage/Tooltip.component.jsx";


export const ProductComponent = ({product}) => {
    const {title, category, condition, price, description, location, images, type } =
        product;
    const [productType, setProductType] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (type === "need") {
            setProductType("Gesuch")
        } else if (type === "offer") {
            setProductType("Angebot")
        }
    }, []);

    const handleLinkClick = (event) => {
        event.preventDefault();
        navigate(`/products/${product._id}`)
    };

    return (
        <div className="w-full lg:h-[450px] bg-whitesmoke p-2 lg:p-4  border rounded-lg hover:shadow-md flex flex-col justify-between hover:shadow-md transition-all cursor-pointer" onClick={handleLinkClick}>
            <div className="flex justify-center mb-2 h-1/2 lg:h-[180px]">
                <img src={images.length > 0 ? images[0] : "https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=Kein%20Bild%20vorhanden%20%3C%3Apepw%3A989410572514758676%3E"} alt={title} className="object-cover rounded"/>
            </div>
            <div className="grow text-center flex flex-col items-center justify-between">
                <h3 className="text-lg md:text-xl lg:text-2xl mb-2 line-clamp-1">
                    {title}
                </h3>
                <p className="text-sm text-base lg:text-lg mb-2 text-emerald font-semibold ">{`${productType}`}</p>
                {/*<p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Kategorie: ${category}`}</p>*/}
                {/*<p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Zustand: ${condition}`}</p>*/}
                <p className="font-bold text-base lg:text-lg  mb-2">{`Preis: ${price} €`}</p>
                {/*<p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2 line-clamp-3">{`${description}`}</p>*/}
                <p className="text-sm text-base lg:text-lg">{`PLZ / Ort: ${location.zip}, ${location.city}`}</p>

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
