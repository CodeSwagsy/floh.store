import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

export const RandomProductComponent = () => {
    const [randomProduct, setRandomProduct] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchRandomProduct = async () => {
            try {
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
                    setRandomProduct(randomProduct);
                } else {
                    console.error('Error fetching all products:', allProductsData.message);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };
        fetchRandomProduct();
    }, []);
    if (randomProduct) {
        navigate(`/products/${randomProduct._id}`)
    }
};
