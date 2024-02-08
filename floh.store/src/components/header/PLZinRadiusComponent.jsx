// PLZinRadiusComponent.jsx
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export const PLZinRadiusComponent = ({
  setProducts,
  setLoading,
  setSearchQuery,
  onSearchOnSubmit,
}) => {
  const [postalCode, setPostalCode] = useState("");
  const [radius, setRadius] = useState(5);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      getPLZinRadius();
    }
  }, [postalCode, radius, submitted]);

  
const getPLZinRadius = async () => {
  if (!postalCode || postalCode.length < 5 || isNaN(postalCode)) {
    setFetchedProducts([]);
    setShowNoProductsMessage(true);
    setLoading(false);
    return;
  }

  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: `data=${encodeURIComponent(`
        [out:json];
        rel[boundary=postal_code][postal_code=${postalCode}];
        rel(around:${radius * 1000})[boundary=postal_code][postal_code];
        out;`)}`,
    });

    const data = await res.json();
    const plzArray = data.elements.map((i) => i.tags.postal_code);
    console.log("Postal Codes in Radius:", plzArray);

    const productRes = await fetch(`${import.meta.env.VITE_API}/product/byPostalCodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postalCodes: plzArray }),
    });

    const productData = await productRes.json();
    console.log("Product Data:", productData);

    if (productData.code === 200) {
      console.log("Products in Radius:", productData.products);
      setFetchedProducts(productData.products);
      setSearchQuery("");
      setProducts(productData.products);
      setShowNoProductsMessage(false);
      onSearchOnSubmit && onSearchOnSubmit(plzArray);
    } else {
      console.error("Error fetching products:", productData.error.message);
      setShowNoProductsMessage(true);
    }
  } catch (error) {
    console.error("Error fetching postal codes:", error);
    setShowNoProductsMessage(true);
  } finally {
    setLoading(false);
  }
};

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
    setShowNoProductsMessage(false);
  };

  const handleRadiusChange = (e) => {
    setRadius(parseInt(e.target.value));
    setShowNoProductsMessage(false);
  };

  return (
    <div className="flex items-center">
      <label className="relative block text-xs mb-1 mr-2">
        <input
          type="text"
          className="w-13 h-9 p-1 border rounded pr-1 mt-4"
          value={postalCode}
          onChange={handlePostalCodeChange}
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength="5"
          placeholder="PLZ"
        />

        <FaSearch
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black-00 text-black p-0.5 rounded hover:bg-black-0 cursor-pointer text-lg"
          style={{ top: "62%" }}
          onClick={() => {
            setSubmitted(true);
            getPLZinRadius();
          }}
        />
      </label>

      <div className="flex items-center ml-4">
        <label className="block text-xs mb-1">
          <input
            type="range"
            className="p-1 border rounded bg-green-500"
            style={{ width: "50px" }}
            value={radius}
            min="1"
            max="5"
            onChange={handleRadiusChange}
          />
        </label>
        <span className="text-xs ml-1">{radius} km</span>
      </div>
      <div className="product-cards">
        {fetchedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PLZinRadiusComponent;
