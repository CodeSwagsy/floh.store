import "./App.css";
import { HeaderComponent } from "./components/header/header.component.jsx";
import { HeroComponent } from "./components/hero/hero.component.jsx";
import { products } from "./components/productSection/product.data.jsx";
import { ProductSectionComponent } from "./components/productSection/productsection.component.jsx";
import { RegisterComponent } from "./components/register/register.component.jsx";
import { SigninComponent } from "./components/sign-in/signin.component.jsx";
function App() {
  return (
    <>
      <HeaderComponent />
      <HeroComponent />
      <ProductSectionComponent products={products} />
      <SigninComponent />
      <RegisterComponent />
    </>
  );
}

export default App;
