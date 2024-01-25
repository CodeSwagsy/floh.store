import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {ProductCard} from "./productcard.component.jsx";


export const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url;

                // Überprüfe, ob eine Kategorie ausgewählt ist oder nicht
                if (id) {
                    // Wenn eine Kategorie ausgewählt ist, fetch die Produkte dieser Kategorie
                    url = `${import.meta.env.VITE_API}/product/category/${id}`;
                } else {
                    // Wenn alle Kategorien ausgewählt sind, fetch alle Produkte
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


    const categoryTitle = id ? id : 'Alle Produkte';
    return (
        <div className=" container mx-auto my-8 mt-16">
            <h2 className="text-3xl font-bold mb-4">{categoryTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        </div>
    );
};
