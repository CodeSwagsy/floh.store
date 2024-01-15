import "./App.css";
import {HeaderComponent} from "./components/header/header.component.jsx";
import {HeroComponent} from "./components/hero/hero.component.jsx";
import {products} from "./components/productSection/product.data.jsx";
import {ProductSectionComponent} from "./components/productSection/productsection.component.jsx";
import {FooterComponent} from "./components/footer/footer.component.jsx";

function App() {
    return (
        <>
            <HeaderComponent/>
            <HeroComponent/>
            <ProductSectionComponent products={products}/>
            <FooterComponent/>
        </>
    );
}

export default App;
