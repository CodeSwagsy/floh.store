
import {ProductComponent} from "./product.component.jsx";

export const ProductSectionComponent = ({ products }) => {
  const maxVisibleProducts = 5;



  // Add event handlers to change overflow property on hover
  const handleMouseEnter = () => {
    sectionStyle.overflowX = 'auto';
  };

  const handleMouseLeave = () => {
    sectionStyle.overflowX = 'hidden';
  };

  return (
    <div
      className="flex flex-col items-center p-[20px] bg-emerald overflow-x-hidden mt-[80px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-2xl mb-[10px]">New Products</h2>
      <div className="flex gap-2.5 py-2.5">
        {products.slice(0, maxVisibleProducts).map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

