import {HeaderComponent} from "../../components/header/header.component.jsx";
import {FooterComponent} from "../../components/footer/footer.component.jsx";
import {SingleProductComponent} from "../../components/singleProduct/singleproduct.component.jsx";


export function SingleProductContainer() {

    return (
        <>
            <HeaderComponent/>
            <SingleProductComponent showRandomProduct={false}/>
            <FooterComponent/>
        </>
    )
}