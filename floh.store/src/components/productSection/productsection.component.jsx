import React, {useEffect, useState} from "react";
import {ProductComponent} from "./product.component.jsx";

export const ProductSectionComponent = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(4);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API}/product/all`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                if (data.code === 200) {
                    setProducts(data.products);
                } else {
                    console.error("Error fetching products:", data.message);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleResize = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1200) {
            setVisibleProducts(4);
        } else if (screenWidth >= 992) {
            setVisibleProducts(3);
        } else if (screenWidth >= 768) {
            setVisibleProducts(2);
        } else {
            setVisibleProducts(1);
        }

        // Ensure currentIndex is within bounds
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex, Math.max(0, products.length - visibleProducts))
        );
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [products, visibleProducts]);

    const handlePrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - visibleProducts : prevIndex - 1
        );
    };

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - visibleProducts ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="bg-emerald ">
            <div className="container mx-auto flex flex-col items-center py-4 lg:py-8 mt-8 md:mt-12 lg:mt-16">
                <h2 className="text-2xl lg:text-3xl mb-4 md:mb-6 lg:mb-8 font-bold">Neue Produkte</h2>
                <div className="relative w-full ">
                    <div className="flex gap-2.5 md:gap-4 lg:gap-6 justify-center lg:justify-between">
                        {products
                            .slice(currentIndex, currentIndex + visibleProducts)
                            .map((product, index) => (
                                <ProductComponent
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>
                    {products.length > visibleProducts && (
                        <>
                            <button
                                className="absolute left-2 xl:-left-12 2xl:-left-24 top-1/2 transform -translate-y-1/2 bg-jet hover:bg-springgreen transition-all text-white px-3 py-1.5 rounded-full"
                                onClick={handlePrevSlide}
                            >
                                &lt;
                            </button>
                            <button
                                className="absolute right-2 xl:-right-12 2xl:-right-24 top-1/2 transform -translate-y-1/2 bg-jet hover:bg-springgreen transition-all text-white px-3 py-1.5 rounded-full"
                                onClick={handleNextSlide}
                            >
                                &gt;
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
