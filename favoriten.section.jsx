import React from "react";
import { Favorites } from "./favoriten.data";

export const ProductSections = ({ favorites }) => {
  const maxVisibleFavorites = 5;

  return (
    <div className="flex flex-col items-center p-4 bg-emerald overflow-x-hidden mt-8 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
      <h2 className="text-2xl mb-4 md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Favoriten
      </h2>
      <div className="flex flex-wrap gap-2.5 py-2.5">
        {favorites.slice(0, maxVisibleFavorites).map((favorite) => (
          <Favorites key={favorite.id} product={favorite} />
        ))}
      </div>
    </div>
  );
};
