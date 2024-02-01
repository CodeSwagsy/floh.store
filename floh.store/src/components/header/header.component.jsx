import React, { useState, useEffect } from "react";
import { CategoryComponent } from "./category.component.jsx";
import { SearchfieldComponent } from "./searchfield.component.jsx";
import { LinkButtonComponent } from "./button.component.jsx";
import { NavComponent } from "./nav.component.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useData } from "../../context/signin.context.jsx";

export function HeaderComponent() {
    const { login } = useData();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [linkClicked, setLinkClicked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchInputChange = async (value) => {
        setSearchQuery(value);
        setLinkClicked(false);
    };

    useEffect(() => {
        const fetchSearchedProducts = async () => {
            try {
                setLoading(true);

                let url = `${import.meta.env.VITE_API}/product/search?query=${searchQuery}`;
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
                    setSearchedProducts(data.products);
                    console.log(data.products);
                } else {
                    console.error(data.error.message);
                }
            } catch (error) {
                console.error("Error fetching searched products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchSearchedProducts();
        } else {
            setSearchedProducts([]);
        }
    }, [searchQuery]);

    const handleProductLinkClick = (productId) => {
        setLinkClicked(true);
        navigate(`/products/${productId}`);
    };

    useEffect(() => {
        if (!location.pathname.includes("/products") && linkClicked) {
            // Clear search query when navigating away from the products page
            setSearchQuery("");
        }
    }, [location.pathname, linkClicked]);

    return (
        <header>
            <div className="container mx-auto bg-whitesmoke mb-2 lg:mb-4">
                <div className="flex flex-row items-center justify-around mt-2 lg:mt-4">
                    <Link to="/">
                        <img src="/logo.svg" alt="Floh.store" className="mt-2" />
                    </Link>
                    <div className="flex flex-row xl:w-6/12 justify-center gap-8 max-lg:hidden">
                        <CategoryComponent additionalClasses="" />
                        <SearchfieldComponent
                            additionalClasses="grow"
                            onSearchInputChange={handleSearchInputChange}
                        />
                    </div>
                    <LinkButtonComponent
                        text="+ Anzeige erstellen"
                        additionalClasses={login ? "w-1/4 bg-jet lg:px-2 xl:px-4 xl:py-2" : "max-lg:w-4/12 max-lg:py-2 bg-jet lg:px-2 xl:px-4 xl:py-2"}
                        link="/products/add"
                    />
                    <LinkButtonComponent
                        text={login ? "Angemeldet " : "Login / Registrieren"}
                        additionalClasses={login ? "hidden" : "max-lg:hidden bg-jet lg:px-2 xl:px-4 xl:py-2"}
                        link="/profile/signin"
                    />
                    <NavComponent />
                </div>
                <div className="flex flex-row justify-between w-full lg:hidden bg-jet/25 p-2 mt-2">
                    <SearchfieldComponent additionalClasses="placeholder:text-white w-7/12" />
                    <CategoryComponent additionalClasses="" selectClasses="text-right" />
                </div>
                {loading && <p>Loading...</p>}
                {searchQuery && searchedProducts.length > 0 && !linkClicked && (
                    <div className="container mx-auto my-8 mt-16">
                        <h2 className="text-3xl font-bold mb-4">Searched Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {searchedProducts.map((product) => (
                                <div key={product._id}>
                                    <Link to={`/products/${product._id}`} onClick={() => handleProductLinkClick(product._id)}>
                                        <p>{product.title}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
