import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { KontaktComponent } from "../../components/kontakt/kontakt.component.jsx";

export function KontaktContainer() {
  return (
    <>
      <HeaderComponent />
      <KontaktComponent />
      <FooterComponent />
    </>
  );
}
