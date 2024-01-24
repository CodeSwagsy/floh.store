import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { ErrorCodeComponent } from "../../components/sign-in/resetPassword/errorcode.component.jsx";

export function ErrorCodeContainer() {
  return (
    <>
      <HeaderComponent />
      <ErrorCodeComponent />
      <FooterComponent />
    </>
  );
}
