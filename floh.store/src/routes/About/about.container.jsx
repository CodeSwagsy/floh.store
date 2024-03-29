import {HeaderComponent} from "../../components/header/header.component.jsx";
import {FooterComponent} from "../../components/footer/footer.component.jsx";
import {AboutUsComponent} from "../../components/about.us/about.us.component.jsx";
import {HeroComponent} from "../../components/hero/hero.component.jsx";

export function AboutContainer() {
    return (
        <>
            <HeaderComponent/>
            <HeroComponent/>
            <AboutUsComponent/>
            <FooterComponent/>
        </>
    );
}
