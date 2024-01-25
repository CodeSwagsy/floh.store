import {useEffect, useState} from "react";
import {FavoriteComponent} from "./Favorite.component.jsx";
import {ProductCard} from "./ProductCard.component.jsx";
import {useParams} from "react-router";

export const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const {id} = useParams();
    const categoryTitle = id ? id : 'Alle Produkte';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url;
                if (id) {
                    url = `${import.meta.env.VITE_API}/product/category/${id}`;
                } else {
                    url = `${import.meta.env.VITE_API}/product/all`;
                }
                const response = await fetch(url, {
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

        fetchProducts();
    }, [id]);


    const handleAddToFavorites = async (product) => {
        try {
            if (!product) {
                console.error("Product is undefined or null.");
                return;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API}/update/favorites/:item`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({product}),
                }
            );

            const data = await response.json();
            if (data.code === 200) {
                console.log("FAVORITE HINZUGEFÜGT")
            } else {
                console.error("Error adding to favorites: ELSE", data.message);
            }
        } catch (error) {
            console.error("Error adding to favorites: CATCH", error);
        }
    };

    return (
        <div className=" container mx-auto my-8 mt-16">
            <h2 className="text-3xl font-bold mb-4">{categoryTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onAddToFavorites={handleAddToFavorites}
                    />
                ))}
            </div>
        </div>
    );
}
