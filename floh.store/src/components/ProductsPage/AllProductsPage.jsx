import React, {useEffect, useState} from "react";
import {ProductCard} from "./ProductCard.component.jsx";
import {useParams} from "react-router-dom";
import {LoaderComponent} from "../loader/loader.component.jsx";
import {useData} from "../../context/signin.context.jsx";


export const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const {
        searchedProducts,
        queryError,
        updateSearchedProducts,
        searchQuery,
        startSearch,
    } = useData()
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const productsPerPage = 20;

    const {id} = useParams();
    const categoryTitle = id ? id : 'Alle Produkte';

    useEffect(() => {
        setProducts(searchedProducts)
    }, [searchedProducts]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const displayedProducts = Array.isArray(products) && products.length > 0
        ? products.slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
        )
        : [];

    useEffect(() => {
        if (!startSearch) {
            const fetchData = async () => {
                if (products.length === 0) {
                    console.log("useEffect getriggert")
                    try {
                        const response = await fetch(`${import.meta.env.VITE_API}/product/all`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                        const data = await response.json();
                        if (data.code === 200) {
                            updateSearchedProducts(data.products);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            };

            fetchData();
        }
    }, []);

    return (
        <div className="container mx-auto my-8 mt-16">
            <h2 className="text-2xl lg:text-4xl my-4 lg:mt-12 lg:mb-8 text-emerald font-bold">{categoryTitle}</h2>
            {loading ? (
                <LoaderComponent/>
            ) : (
                (!Array.isArray(products) || products.length === 0) ? (
                    <>
                        <h1 className="text-black font-bold text-xl">LOGIKFAIL! {queryError}</h1>
                    </>
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
                                className={`px-4 py-2 mr-2 ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-emerald text-white hover:bg-springgreen transition-all'} rounded `}
                                disabled={currentPage === 1}
                            >
                                &larr; Vorherige
                            </button>
                            {Array.from(
                                {length: Math.ceil(products.length / productsPerPage)},
                                (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => paginate(index + 1)}
                                        className={`px-4 py-2 mx-1 focus:outline-none hover:bg-springgreen  transition-all ${currentPage === index + 1
                                            ? "bg-emerald text-white"
                                            : "bg-gray-300 text-gray-500"
                                        } rounded`}
                                    >
                                        {index + 1}
                                    </button>
                                )
                            )}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                className={`px-4 py-2 ml-2 ${currentPage === Math.ceil(products.length / productsPerPage) ? 'bg-gray-300 text-gray-500' : 'bg-emerald text-white hover:bg-springgreen transition-all'} rounded `}
                                disabled={
                                    currentPage === Math.ceil(products.length / productsPerPage)
                                }
                            >
                                Nächste &rarr;
                            </button>
                        </div>
                    </>
                )
            )}
        </div>
    );
}