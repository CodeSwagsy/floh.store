import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { RegisterComponent } from "../../components/sign-in/register/register.component.jsx";

export function RegisterContainer() {
  return (
    <>
      <HeaderComponent />
      <RegisterComponent />
      <FooterComponent />
    </>
  );
}
