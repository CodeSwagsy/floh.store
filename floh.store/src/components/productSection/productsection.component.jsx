import React, { useEffect, useState } from "react";
import { ProductComponent } from "./product.component.jsx";

export const ProductSectionComponent = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

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

    fetchProducts();
  }, []);

  const handleResize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1200) {
      setVisibleProducts(4);
    } else if (screenWidth >= 992) {
      setVisibleProducts(3);
    } else if (screenWidth >= 768) {
      setVisibleProducts(2);
    } else {
      setVisibleProducts(1);
    }

    // Ensure currentIndex is within bounds
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex, Math.max(0, products.length - visibleProducts))
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [products, visibleProducts]);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - visibleProducts : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - visibleProducts ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8 lg:p-12 bg-emerald mt-8 md:mt-12 lg:mt-16">
      <h2 className="text-2xl mb-4 md:mb-6 lg:mb-8">New Products</h2>
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-2.5 md:gap-4 lg:gap-6 justify-center">
          {products
            .slice(currentIndex, currentIndex + visibleProducts)
            .map((product, index) => (
              <ProductComponent
                key={product.id}
                product={product}
                className={`w-full md:w-1/2 lg:w-1/4 xl:w-1/5 transition-transform ease-in-out transform ${
                  index === 0 ? "scale-110" : "scale-100 opacity-50"
                }`}
              />
            ))}
        </div>
        {products.length > visibleProducts && (
          <>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full"
              onClick={handlePrevSlide}
            >
              &lt;
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full"
              onClick={handleNextSlide}
            >
              &gt;
            </button>
          </>
        )}
      </div>
    </div>
  );
};
