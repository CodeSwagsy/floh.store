// AllProductsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const FavoriteComponent = ({ favorite }) => {
  const { title, category, condition, price, description, location, images } =
    favorite;

  const [isHovered, setIsHovered] = useState(false);

  const handleViewDetails = () => {
    alert(`View details for ${title}`);
  };

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

export const AllFavoritePage = () => {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await fetch("https://api.floh.store/favorite/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.code === 200) {
          setFavorite(data.favorite);
        } else {
          console.error("Error fetching favorite:", data.message);
        }
      } catch (error) {
        console.error("Error fetching favortie:", error);
      }
    };

    fetchFavorite();
  }, []);

  return (
    <div className="container mx-auto my-8 mt-16">
      <h2 className="text-3xl font-bold mb-4">All Favorite</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favorite.map((favorite) => (
          <FavoriteCard key={favorite._id} favorite={favorite} />
        ))}
      </div>
    </div>
  );
};
