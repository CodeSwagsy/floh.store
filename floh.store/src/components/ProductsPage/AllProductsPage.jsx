﻿// ProductsAndFavoritesPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product, onAddToFavorites }) => {
  const { title, category, condition, price, description, location, images } =
    product;

  const [isHovered, setIsHovered] = useState(false);

  const handleAddToFavorites = () => {
    onAddToFavorites(product);
  };

  return (
    <div
      className={`bg-gray-100 p-4 border rounded-lg hover:shadow-md transition duration-300 mb-4 flex flex-col justify-between ${
        isHovered ? "shadow-md" : ""
      }`}
    >
      <div className="flex justify-center mb-3 h-1/3">
        <img src={images[0]} alt={title} className="object-cover rounded" />
      </div>
      <div className="text-center flex flex-col">
        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2">
          {title}
        </h3>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">{`Category: ${category}`}</p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">{`Condition: ${condition}`}</p>
        <p className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl mb-2">{`Price: $${price}`}</p>
        <p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl mb-2 line-clamp-4">{`${description}`}</p>
        <p className="text-justify text-sm md:text-base lg:text-lg xl:text-xl mb-2">{`Location: ${location.city}, ${location.zip}`}</p>
        <button
          onClick={handleAddToFavorites}
          className={`bg-blue-500 text-white px-5 py-2 rounded mt-4 ${
            isHovered ? "bg-blue-600" : "bg-gray-800"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Add to Favorites
        </button>
        <Link
          to={`/products/${product._id}`}
          className={`bg-green-500 text-white px-5 py-2 rounded mt-4 ${
            isHovered ? "bg-green-600" : "bg-gray-800"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export const FavoriteComponent = ({ favorite }) => {
  if (!favorite) {
    return null;
  }

  const { title, category, condition, price, description, location, images } =
    favorite;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-gray-100 p-4 border rounded-lg hover:shadow-md transition duration-300 mb-4 ${
        isHovered ? "shadow-md" : ""
      }`}
    >
      <div className="flex justify-center mb-3">
        <img src={images[0]} alt={title} className="w-40 h-40 rounded" />
      </div>
      <div className="text-center">
        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2">
          {title}
        </h3>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">{`Category: ${category}`}</p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">{`Condition: ${condition}`}</p>
        <p className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl mb-2">{`Price: $${price}`}</p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">{`Description: ${description}`}</p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">{`Location: ${location.city}, ${location.zip}`}</p>
        <Link
          to={`/favoriteproducts/${favorite._id}`}
          className={`bg-green-500 text-white px-5 py-2 rounded mt-4 ${
            isHovered ? "bg-green-600" : "bg-gray-800"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.floh.store/product/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
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

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/about/:id`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data.doc);
        if (data.code === 200) {
          setFavorites(data.favorites);
        } else {
          console.error("Error fetching favorites:", data.message);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchProducts();
    fetchFavorites();
  }, []);

  const handleAddToFavorites = async (product) => {
    try {
      if (!product) {
        console.error("Product is undefined or null.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API}/update/favorites/:item`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product }),
        }
      );

      const data = await response.json();
      if (data.code === 200) {
        // Update the favorites list
        setFavorites([...favorites, product]);
      } else {
        console.error("Error adding to favorites:", data.message);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div className=" container mx-auto my-8 mt-16">
      <h2 className="text-3xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToFavorites={handleAddToFavorites}
          />
        ))}
      </div>
      <h2 className="text-3xl font-bold mb-4 mt-8">All Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favorites.map((favorite) => (
          <FavoriteComponent key={favorite._id} favorite={favorite} />
        ))}
      </div>
    </div>
  );
};
