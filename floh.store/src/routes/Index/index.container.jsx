import {HeaderComponent} from "../../components/header/header.component.jsx";
import {HeroComponent} from "../../components/hero/hero.component.jsx";
import {ProductSectionComponent} from "../../components/productSection/productsection.component.jsx";
import {FooterComponent} from "../../components/footer/footer.component.jsx";


export function IndexContainer() {
    return (
        <>
            <HeaderComponent/>
            <HeroComponent/>
            <ProductSectionComponent/>
            <FooterComponent/>
        </>
    )
}