
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useData} from "../../context/signin.context.jsx";
import {Tooltip} from "./Tooltip.component.jsx";

export const ProductCard = ({product, onAddToFavorites, favoriteText}) => {
    const {title, category, condition, price, description, location, images, type} =
        product;

    const {login, updateLogin} = useData()
    const [disableButton, setDisableButton] = useState(false)
    const [disabledClasses, setDisabledClasses] = useState("bg-gray-400 cursor-default")
    const [productType, setProductType] = useState("")

    useEffect(() => {
        if (login) {
            setDisableButton(false)
            setDisabledClasses("bg-emerald cursor-pointer hover:bg-springgreen")
        } else {
            setDisableButton(true)
            setDisabledClasses("bg-gray-400 cursor-default")
        }
        if (type === "need") {
            setProductType("Gesuch")
        } else if (type === "offer") {
            setProductType("Angebot")
        }
    }, []);


    const handleAddToFavorites = () => {
        onAddToFavorites(product);
    };

    return (
        <div
            className="bg-gray-100 p-2 lg:p-4 border rounded-lg hover:shadow-md mb-4 flex flex-col justify-between hover:shadow-md transition-all"
        >
            <div className="flex justify-center mb-2 lg:h-2/5">
                <img src={images[0]} alt={title} className="object-cover rounded"/>
            </div>
            <div className="text-center flex flex-col items-center lg:h-3/5 justify-between">
                <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 line-clamp-1">
                    {title}
                </h3>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2 text-emerald font-semibold">{`${productType}`}</p>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Kategorie: ${category}`}</p>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Zustand: ${condition}`}</p>
                <p className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl mb-2">{`Preis: ${price} €`}</p>
                <p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2 line-clamp-2 ">{`${description}`}</p>
                <p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`PLZ / Ort: ${location.city}, ${location.zip}`}</p>
                {login ? (
                    <>
                        <button
                            onClick={handleAddToFavorites} disabled={disableButton}
                            className={`bg-blue-500 w-full text-white px-5 py-2 rounded mt-2 lg:mt-4 transition-all ${disabledClasses}`}
                        >
                            {favoriteText}
                        </button>
                    </>
                ) : (
                    <>
                        <Tooltip text="Anmeldung notwendig um Produkte zur Merkliste hinzuzufügen">
                            <button
                                onClick={handleAddToFavorites} disabled={disableButton}
                                className={`bg-blue-500 w-full text-white px-5 py-2 rounded mt-2 lg:mt-4 transition-all ${disabledClasses}`}
                            >
                                {favoriteText}
                            </button>
                        </Tooltip>
                    </>
                )}
                <Link
                    to={`/products/${product._id}`}
                    className={`bg-green-500 text-white px-5 py-2 rounded mt-2 lg:mt-4 bg-emerald hover:bg-springgreen transition-all w-full`}
                >
                    Produkt anzeigen
                </Link>
            </div>
        </div>
    );
};