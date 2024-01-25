import React, {useState} from "react";
import {ProductCard} from "../ProductsPage/ProductCard.component.jsx";


export const FavoriteComponent = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);



    return (
        <div className=" container mx-auto my-8 mt-16">
            <h2 className="text-3xl font-bold mb-4">Meine Favoriten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}
