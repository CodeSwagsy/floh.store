import './App.css'
import React from 'react';
import {HeaderComponent} from "./components/header/header.component.jsx";
import {ProductSections} from "./components/ProductSection/ProductSections.jsx";
import {products} from './components/ProductSection/productsData';
import {HeroComponent} from "./components/header/hero.component.jsx";


function App() {
    return (
        <>
            <HeaderComponent/>            
            <HeroComponent/>
            <ProductSections products={products} />
        </>
    )
}

export default App
