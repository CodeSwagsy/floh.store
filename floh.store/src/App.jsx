import "./App.css";
import { HeaderComponent } from "./components/header/header.component.jsx";
import { HeroComponent } from "./components/hero/hero.component.jsx";
import Loader from "./components/loader/loader.component.jsx";
import { products } from "./components/productSection/product.data.jsx";
import { ProductSectionComponent } from "./components/productSection/productsection.component.jsx";

function App() {
  return (
    <>
    
      <HeaderComponent />
      <HeroComponent />
      <ProductSectionComponent products={products} />
    </>
  );
}

export default App;
