import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { NewPasswordComponent } from "../../components/sign-in/resetPassword/newpassword.component.jsx";

export function NewPasswordContainer() {
  return (
    <>
      <HeaderComponent />
      <NewPasswordComponent />
      <FooterComponent />
    </>
  );
}
