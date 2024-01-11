
import {ProductComponent} from "./product.component.jsx";

export const ProductSectionComponent = ({ products }) => {
  const maxVisibleProducts = 5;
  return (
      <div className="flex flex-col items-center p-4 bg-emerald overflow-x-hidden mt-8 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
        <h2 className="text-2xl mb-4 md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">New Products</h2>
        <div className="flex flex-wrap justify-center gap-2.5 py-2.5">
          {products.map((product, index) => (
              <ProductComponent
                  key={product.id}
                  product={product}
                  className={`lg:w-1/5 xl:w-1/5 2xl:w-1/5 ${index >= maxVisibleProducts ? 'hidden md:block' : ''}`}
              />
          ))}
        </div>
      </div>
  );
};

