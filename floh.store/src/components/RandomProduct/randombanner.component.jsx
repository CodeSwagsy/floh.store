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
          for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(
              Math.random() * allProductsData.products.length
            );
            randomProductsArray.push(allProductsData.products[randomIndex]);
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
  }, []);

  if (!randomProduct) {
    return null;
  }

  return (
    <div className="container mx-auto ">
        <h2 className="text-2xl lg:text-4xl my-4 lg:mt-12 lg:mb-8 text-emerald font-bold">Entdecke die Vielfalt</h2>
      <div className=" bg-platinum p-3 max-w-full mx-auto mt-10 grid grid-cols-8 rounded-md  ">
        {randomProduct.map((randomProduct, index) => (
          <div
            key={index}
            className=" items-end group h-64 rounded-md flex-shrink-0 place-content: center  focus:bg-emerald mx-1 "
          >
            {randomProduct.images && randomProduct.images.length > 0 && (
              <img
                className=" h-32 w-auto object-cover rounded-t-md group "
                src={randomProduct.images[0]}
                alt={randomProduct.title}
              />
            )}
            <div className="space-y-2 text-wrap group-hover:bg-emerald border-solid border border-jet border-1 bg-whitesmoke  rounded-b-md shadow-md h-32 text-center p-2">

              <p className=" text-jet font-medium leading-5 group-hover:text-whitesmoke">
                {randomProduct.title}
              </p>
              <p className=" rounded-full group-hover:bg-jet bg-platinum leading-7 group-hover:text-white text-base text-emerald font-medium">
                ${randomProduct.price}
              </p>
              <p className=" text-jet font-normal leading-7  group-hover:text-whitesmoke">
                {randomProduct.location.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
