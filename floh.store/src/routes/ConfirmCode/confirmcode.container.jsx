import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { ConfirmCodeComponent } from "../../components/sign-in/resetPassword/confirmcode.component.jsx";

export function ConfirmCodedContainer() {
  return (
    <>
      <HeaderComponent />
      <ConfirmCodeComponent />
      <FooterComponent />
    </>
  );
}
