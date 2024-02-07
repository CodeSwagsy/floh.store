import React, { useState, useEffect } from "react";
import { CategoryComponent } from "./category.component.jsx";
import { SearchfieldComponent } from "../header/searchfield.component.jsx";
import { LinkButtonComponent } from "./button.component.jsx";
import { NavComponent } from "./nav.component.jsx";
import { Link } from "react-router-dom";
import { useData } from "../../context/signin.context.jsx";
import { ProductCard } from "../ProductsPage/ProductCard.component.jsx";
import { useParams } from "react-router";
import { LoaderComponent } from "../loader/loader.component.jsx";

export function HeaderComponent() {
    const { userData, login, updateUserData, updateLogin } = useData();
    const { id } = useParams();
    const categoryTitle = id ? id : "Alle Produkte";

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [favoriteTexts, setFavoriteTexts] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    const handleSearchInputChange = async (value) => {
        setSearchQuery(value);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSearchQuery("");
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

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
                    const initialFavoriteTexts = {};
                    data.products.forEach((product) => {
                        initialFavoriteTexts[product._id] = "Zur Merkliste hinzufügen";
                    });
                    setFavoriteTexts(initialFavoriteTexts);

                    // Filter products based on search query if it exists
                    const filteredProducts = searchQuery
                        ? data.products.filter(
                            (product) =>
                                product.title &&
                                product.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        : data.products;

                    setProducts(filteredProducts);
                    console.log(filteredProducts);
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
    }, [selectedCategory, searchQuery]);

    const handleAddToFavorites = async (product) => {
        try {
            if (!product) {
                console.error("Product is undefined or null.");
                return;
            }

            const response = await fetch(
                `${import.meta.env.VITE_API}/user/update/favorites/${product._id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ product }),
                }
            );

            const data = await response.json();
            if (data.code === 200) {
                setFavoriteTexts((prevFavoriteTexts) => ({
                    ...prevFavoriteTexts,
                    [product._id]: "Zur Merkliste hinzugefügt",
                }));
                console.log("FAVORITE HINZUGEFÜGT");
            } else {
                console.error("Error adding to favorites: ELSE", data.message);
            }
        } catch (error) {
            console.error("Error adding to favorites: CATCH", error);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const filteredProducts = searchQuery
        ? products.filter(
            (product) =>
                product.title &&
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : products;

    const displayedProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const currentProducts = searchQuery
        ? displayedProducts
        : products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <header>
            <div className="container mx-auto bg-whitesmoke mb-2 lg:mb-4">
                <div className="flex flex-row items-center justify-around mt-2 lg:mt-4">
                    <Link to="/">
                        <img src="/logo.svg" alt="Floh.store" className="mt-2" />
                    </Link>

                    <div className="flex flex-row xl:w-6/12 justify-center gap-8 max-lg:hidden">
                        <CategoryComponent
                            additionalClasses=""
                            onCategoryChange={handleCategoryChange}
                        />
                        <SearchfieldComponent
                            additionalClasses="mt-4"
                            onSearchInputChange={(value) => setSearchQuery(value)}
                        />
                    </div>
                    <LinkButtonComponent
                        text="+ Anzeige erstellen"
                        additionalClasses={
                            login
                                ? "w-1/4 bg-jet lg:px-2 xl:px-4 xl:py-2"
                                : "max-lg:w-4/12 max-lg:py-2 bg-jet lg:px-2 xl:px-4 xl:py-2"
                        }
                        link="/products/add"
                    />
                    <LinkButtonComponent
                        text={login ? "Angemeldet " : "Login / Registrieren"}
                        additionalClasses={
                            login ? "hidden" : "max-lg:hidden bg-jet lg:px-2 xl:px-4 xl:py-2"
                        }
                        link="/profile/signin"
                    />
                    <NavComponent />
                </div>

                {loading && <LoaderComponent />}

                {searchQuery && currentProducts.length > 0 && (
                    <div className="container mx-auto my-8 mt-16">
                        <h2 className="text-3xl font-bold mb-4">Searched Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onAddToFavorites={handleAddToFavorites}
                                    favoriteText={favoriteTexts[product._id]}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
