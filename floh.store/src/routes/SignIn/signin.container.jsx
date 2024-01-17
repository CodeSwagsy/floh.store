import {HeaderComponent} from "../../components/header/header.component.jsx";
import {FooterComponent} from "../../components/footer/footer.component.jsx";
import {SigninComponent} from "../../components/sign-in/signin.component.jsx";

export function SignInContainer() {
    return (
        <>
            <HeaderComponent/>
            <SigninComponent/>
            <FooterComponent/>
        </>
    )
}