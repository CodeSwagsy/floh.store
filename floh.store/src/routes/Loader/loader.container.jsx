import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import {LoaderComponent} from "../../components/loader/loader.component.jsx";

export function LoaderContainer() {
    return (
        <>
            <HeaderComponent />
            <LoaderComponent />
            <FooterComponent />
        </>
    );
}
