import {HeaderComponent} from "../../components/header/header.component.jsx";
import {FooterComponent} from "../../components/footer/footer.component.jsx";
import { AllProductsPage } from "../../components/ProductsPage/AllProductsPage.jsx";

export function GalleryContainer() {
    return (
        <>
            <HeaderComponent/>
            <AllProductsPage/>
            <FooterComponent/>
        </>
    )
}