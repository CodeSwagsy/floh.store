import {HeaderComponent} from "../../components/header/header.component.jsx";
import {FooterComponent} from "../../components/footer/footer.component.jsx";
import {
    RandomProductComponent
} from "../../components/RandomProduct/randomproduct.component.jsx";


export function RandomProductContainer() {
    return (
        <>
            <HeaderComponent/>
            <RandomProductComponent/>
            <FooterComponent/>
        </>
    )
}