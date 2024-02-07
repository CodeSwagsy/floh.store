import React, {useEffect, useState} from "react";
import {ProductCard} from "../ProductsPage/ProductCard.component.jsx";
import {useData} from "../../context/signin.context.jsx";
import {useNavigate} from "react-router-dom";
import {LoaderComponent} from "../loader/loader.component.jsx";
import {Tooltip} from "../ProductsPage/Tooltip.component.jsx";


export const FavoriteComponent = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([])
    const [productType, setProductType] = useState("")
    const uid = localStorage.getItem("uid");
    const {login, updateLogin} = useData()
    const navigate = useNavigate()
    const [updateFavorites, setUpdateFavorites] = useState(false);

    useEffect(() => {

        if (!login) {
            navigate("/")
        }
    }, []);

    const handleRemoveFavorite = async (product, event) => {
        if (event) {
            event.stopPropagation();
        }
        try {
            if (!product) {
                console.error("Product is undefined or null.");
                return;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API}/user/delete/favorites/${product._id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({product}),
                }
            );

            const data = await response.json();
            if (data.code === 200) {
                setUpdateFavorites(true);
            } else {
                console.error("Error removing from favorites:", data.message);
            }
        } catch (error) {
            console.error("Error removing from favorites:", error);
        }
    };

    useEffect(() => {
            const fetchProducts = async () => {
                try {

                    const response = await fetch(`${import.meta.env.VITE_API}/product/all`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json();
                    if (data.code === 200) {
                        setProducts(data.products);
                    } else {
                        console.error(data.error.message);
                    }
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };

            const fetchFavoriteProducts = async () => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_API}/user/about/${uid}`,
                        {
                            method: "GET",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const data = await response.json();
                    if (data.code === 200) {
                        setFavorites(data.doc.info.favorites);

                    } else {
                        console.error(data.error.message);
                    }
                } catch (error) {
                    console.error("Error fetching favorites catch block:", error);
                }
            };

            fetchProducts();
            fetchFavoriteProducts();
            setUpdateFavorites(false);
        }, [updateFavorites]
    )
    ;

    const filteredProducts = products.filter((product) =>
        favorites.includes(product._id)
    );
    const handleLinkClick = (event) => {
        event.preventDefault();
        navigate(`/products/${product._id}`)
    };

    return (
        <div className=" container mx-auto my-8 mt-16">
            <h2 className="text-3xl font-bold mb-4">Meine Favoriten</h2>
            {products.length !== 0 ? (<>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                className="bg-gray-100 p-2 lg:p-4 h-[550px] lg:h-[600px] border rounded-lg hover:shadow-md mb-4 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer"
                                onClick={handleLinkClick}>

                                <div className="flex justify-center mb-2 h-[300px]">
                                    <img src={product.images[0]} alt={product.title}
                                         className="object-cover rounded h-full"/>
                                </div>
                                <div className="text-center flex flex-col items-center lg:h-3/5 justify-between">
                                    <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 line-clamp-1">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2 text-emerald font-semibold">{product.type === "offer" ? "Angebot" : "Gesuch"}</p>
                                    <p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Kategorie: ${product.category}`}</p>
                                    <p className="text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`Zustand: ${product.condition}`}</p>
                                    <p className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl mb-2">{`Preis: ${product.price} €`}</p>
                                    {/*<p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2 line-clamp-2 ">{`${description}`}</p>*/}
                                    <p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl lg:mb-2">{`PLZ / Ort: ${location.city}, ${location.zip}`}</p>

                                    <button
                                        onClick={(event) => handleRemoveFavorite(product, event)}
                                        className={`bg-red-600 w-full text-white px-5 py-2 rounded mt-2 lg:mt-4 transition-all`}
                                    >
                                        Aus Favoriten entfernen
                                    </button>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Keine Produkte vorhanden.</p>
                    )}
                </div>
            </>) : (<LoaderComponent/>)}

        </div>
    );
};