import React from 'react';
import { Product } from "./Product.jsx";

export const ProductSections = ({ products }) => {
  const maxVisibleProducts = 5;

  return (
    <div
      className="flex flex-col items-center p-4 bg-emerald overflow-x-hidden mt-8 md:p-8 lg:p-12 xl:p-16 2xl:p-20"
    >
      <h2 className="text-2xl mb-4 md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">New Products</h2>
      <div className="flex flex-wrap gap-2.5 py-2.5">
        {products.slice(0, maxVisibleProducts).map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
