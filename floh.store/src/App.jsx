
import "./App.css";
import { HeaderComponent } from "./components/header/header.component.jsx";
import { HeroComponent } from "./components/hero/hero.component.jsx";
import { products } from "./components/productSection/product.data.jsx";
import { ProductSectionComponent } from "./components/productSection/productsection.component.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AllProductsPage } from "./components/ProductsPage/AllProductsPage.jsx";

function App() {
    return (
        <Router>
            <>
                <HeaderComponent />
                <Routes>
                    <Route path="/all-products" element={<AllProductsPage />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <HeroComponent />
                                <ProductSectionComponent products={products} />
                            
                            </>
                        }
                    />
                </Routes>
            </>
        </Router>
    );
}

export default App;
