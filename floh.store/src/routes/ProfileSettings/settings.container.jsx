import {HeaderComponent} from "../../components/header/header.component.jsx";
import {FooterComponent} from "../../components/footer/footer.component.jsx";
import {SettingsComponent} from "../../components/profile/settings.component.jsx";

export function SettingsContainer() {
    return (
        <>
            <HeaderComponent/>
            <SettingsComponent/>
            <FooterComponent/>
        </>
    )
}