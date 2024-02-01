import React, { useState, useEffect } from "react";

export function SearchfieldComponent({ additionalClasses = "", onSearchInputChange }) {
    const classes = `relative rounded-lg shadow-sm ${additionalClasses}`;
    const [id, setId] = useState("");
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url;
                if (searchQuery) {
                    url = `${import.meta.env.VITE_API}/product/search?query=${searchQuery}`;
                } else if (id) {
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
                    console.log(data.products);
                } else {
                    console.error(data.error.message);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [id, searchQuery]);

    <SearchfieldComponent
    additionalClasses="mt-4"
    onSearchInputChange={(value) => setSearchQuery(value)}
    
/>
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        // Check if onSearchInputChange is a function before calling it
        if (typeof onSearchInputChange === 'function') {
            onSearchInputChange(value);

        }
    };

    return (
        <div className={classes}>
            <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Was suchst du?"
                onChange={handleInputChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button type="submit">
                    <img src="/lupe.png" alt="Suchfeld" />
                </button>
            </div>
        </div>
    );
}
