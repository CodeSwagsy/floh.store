import './App.css'
import React from 'react';
import {HeaderComponent} from "./components/header/header.component.jsx";
import {ProductSections} from "./components/ProductSection/ProductSections.jsx";
import {products} from './components/ProductSection/productsData';

function App() {
    return (
        <>
            <HeaderComponent/>
            <ProductSections products={products} />
            
        </>
    )
}

export default App
