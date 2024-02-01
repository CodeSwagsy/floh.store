import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { DatenschutzComponent } from "../../components/datenschutz/datenschutz.component.jsx";

export function DatenschutzContainer() {
  return (
    <>
      <HeaderComponent />
      <DatenschutzComponent />
      <FooterComponent />
    </>
  );
}
