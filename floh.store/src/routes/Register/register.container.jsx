import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { RegisterComponent } from "../../components/register/register.component.jsx";

export function RegisterContainer() {
  return (
    <>
      <HeaderComponent />
      <RegisterComponent />
      <FooterComponent />
    </>
  );
}
