import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

export const RandomProductComponent = () => {
    const [randomProduct, setRandomProduct] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchRandomProduct = async () => {
            try {
                // Fetch all products
                const allProductsResponse = await fetch(`${import.meta.env.VITE_API}/product/all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const allProductsData = await allProductsResponse.json();

                if (allProductsData.code === 200 && allProductsData.products.length > 0) {
                    const randomIndex = Math.floor(Math.random() * allProductsData.products.length);
                    const randomProduct = allProductsData.products[randomIndex];
                    const singleProductResponse = await fetch(
                        `${import.meta.env.VITE_API}/product/id/${randomProduct._id}`,
                        {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    const singleProductData = await singleProductResponse.json();

                    if (singleProductData.code === 200) {
                        setRandomProduct(randomProduct);
                    } else {
                        console.error('Error fetching individual product:', singleProductData.message);
                    }
                } else {
                    console.error('Error fetching all products:', allProductsData.message);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        // Call the function to fetch random product on component mount
        fetchRandomProduct();
    }, []); // Empty dependency array to run the effect only once on mount
    if (randomProduct) {
        navigate(`/products/${randomProduct._id}`)
    }
    return (
        <>
        </>
    );
};
