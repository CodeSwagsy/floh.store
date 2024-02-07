import React from "react";

export function SearchfieldComponent({ additionalClasses = "", onSearchInputChange }) {
    const classes = `relative rounded-lg shadow-sm ${additionalClasses}`;

    const handleInputChange = (e) => {
        console.log("Input value:", e.target.value);
        onSearchInputChange && onSearchInputChange(e.target.value);
    };

    return (
        <div className={classes}>
            <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald sm:text-sm sm:leading-6"
                placeholder="Was suchst du ?"
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