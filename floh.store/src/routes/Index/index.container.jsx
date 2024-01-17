import {HeaderComponent} from "../../components/header/header.component.jsx";
import {HeroComponent} from "../../components/hero/hero.component.jsx";
import {ProductSectionComponent} from "../../components/productSection/productsection.component.jsx";
import {products} from "../../components/productSection/product.data.jsx";
import {FooterComponent} from "../../components/footer/footer.component.jsx";

export function IndexContainer() {
    return (
        <>
            <HeaderComponent/>
            <HeroComponent/>
            <ProductSectionComponent products={products}/>
            <FooterComponent/>
        </>
    )
}