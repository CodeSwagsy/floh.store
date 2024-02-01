import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { ImpressumCompotent } from "../../components/impressum/impressum.component.jsx";

export function ImpressumContainer() {
  return (
    <>
      <HeaderComponent />
      <ImpressumCompotent />
      <FooterComponent />
    </>
  );
}
