import { useState, useEffect } from "react";

export const RandomBannerComponent = () => {
  const [randomProduct, setRandomProduct] = useState(null);

  useEffect(() => {
    const fetchRandomProduct = async () => {
      try {
        const allProductsResponse = await fetch(
          `${import.meta.env.VITE_API}/product/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const allProductsData = await allProductsResponse.json();
        if (
          allProductsData.code === 200 &&
          allProductsData.products.length > 0
        ) {
          const randomProductsArray = [];

          while (randomProductsArray.length < 8) {
            const randomIndex = Math.floor(
              Math.random() * allProductsData.products.length
            );
            const randomProduct = allProductsData.products[randomIndex];
            if (
              !randomProductsArray.some(
                (product) => product._id === randomProduct._id
              )
            ) {
              randomProductsArray.push(randomProduct);
            }
          }

          setRandomProduct(randomProductsArray);
        } else {
          console.error(
            "Error fetching all products:",
            allProductsData.message
          );
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchRandomProduct();

    const interval = setInterval(fetchRandomProduct, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!randomProduct) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl lg:text-4xl my-4 lg:mt-12 lg:mb-8 text-emerald font-bold">
        Entdecke die Vielfalt
      </h2>
      <div className="bg-whitesmoke max-w-full max-lg:mx-2 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 transition-all">
        {randomProduct.map((randomProduct, index) => (
          <a
            key={index}
            href={`/products/${randomProduct._id}`}
            className="h-32 group flex-shrink-0 bg-whitesmoke cursor-pointer transition-all relative"
          >
            <img
              className="h-32 w-full object-cover rounded-md transition-all"
              src={
                randomProduct.images && randomProduct.images.length > 0
                  ? randomProduct.images[0]
                  : "https://picsum.photos/200"
              }
              alt={randomProduct.title}
              title={`${randomProduct.title} aus ${randomProduct.location.city}`}
            />
            <div className="absolute bottom-2 right-2 rounded-full">
              <p className="p-1 bg-emerald inline-flex text-base text-whitesmoke font-medium group-hover:p-1 group-hover:bg-jet group-hover:text-whitesmoke transition-all rounded-full ">
                {randomProduct.price}€
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
