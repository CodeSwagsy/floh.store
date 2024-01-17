import { ProductComponent } from "./product.component.jsx";

export const ProductSectionComponent = ({ products }) => {
  const maxVisibleProducts = 4;

  return (
    <div className="flex flex-col items-center p-4 md:p-8 lg:p-12 bg-emerald mt-8 md:mt-12 lg:mt-16">
      <h2 className="text-2xl mb-4 md:mb-6 lg:mb-8">New Products</h2>
      <div className="flex flex-wrap gap-2.5 md:gap-4 lg:gap-6 justify-center">
        {products.slice(0, maxVisibleProducts).map((product, index) => (
          <ProductComponent key={product.id} product={product} className={`w-full md:w-1/2 lg:w-1/4 ${index >= maxVisibleProducts - 1 ? 'hidden' : ''}`} />
        ))}
      </div>
    </div>
  );
};
