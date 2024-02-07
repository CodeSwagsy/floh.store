
import React, {useEffect, useState} from "react";
import {ProductCard} from "./ProductCard.component.jsx";
import {useParams} from "react-router-dom";
import {LoaderComponent} from "../loader/loader.component.jsx";

export const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const categoryTitle = id ? id : "Alle Produkte";
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const productsPerPage = 20;

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

                if (!response.ok) {
                    throw new Error(`HTTP error`);
                }

                const data = await response.json();
                if (data.code === 200) {
                    setProducts(data.products);
                } else {
                    console.error(data.error.message);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const displayedProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="container mx-auto my-8 mt-16">
            <h2 className="text-3xl font-bold mb-4">{categoryTitle}</h2>

            {loading ? (
                <LoaderComponent />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {displayedProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className="px-4 py-2 mr-2 bg-green-500 text-white rounded"
                            disabled={currentPage === 1}
                        >
                            &larr; Prev
                        </button>
                        {Array.from(
                            { length: Math.ceil(products.length / productsPerPage) },
                            (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 mx-1 focus:outline-none ${currentPage === index + 1
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                    } rounded`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className="px-4 py-2 ml-2 bg-green-500 text-white rounded"
                            disabled={
                                currentPage === Math.ceil(products.length / productsPerPage)
                            }
                        >
                            Next &rarr;
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
