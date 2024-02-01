import React, {useEffect, useState} from "react";
import {ProductCard} from "../ProductsPage/ProductCard.component.jsx";
import {useData} from "../../context/signin.context.jsx";
import {useNavigate} from "react-router-dom";


export const FavoriteComponent = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState({})
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    const uid = loginData ? loginData.uid : null;
    const timestamp = loginData ? loginData.timestamp : null;



    const handleRemoveFavorite = async (product) => {
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
                console.log("FAVORITE ENTFERNT")
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
                    console.error("Error fetching products catchblock:", error);
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
        }, [handleRemoveFavorite]
    )
    ;

    const filteredProducts = products.filter((product) =>
        favorites.includes(product._id)
    );

    return (
        <div className=" container mx-auto my-8 mt-16">
            <h2 className="text-3xl font-bold mb-4">Meine Favoriten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} favoriteText="Aus Favoriten entfernen" onAddToFavorites={handleRemoveFavorite}/>
                    ))
                ) : (
                    <p>Keine Produkte vorhanden.</p>
                )}
            </div>
        </div>
    );
};