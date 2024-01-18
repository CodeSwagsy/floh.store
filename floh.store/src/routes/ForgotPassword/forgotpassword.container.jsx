import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { ForgotPasswordComponent } from "../../components/sign-in/resetPassword/forgotpassword.component.jsx";

export function ForgotPasswordContainer() {
  return (
    <>
      <HeaderComponent />
      <ForgotPasswordComponent />
      <FooterComponent />
    </>
  );
}
