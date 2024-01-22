import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { FavoriteComponent } from "../../components/favoriten/favoriten.component.jsx";

export function FavoriteProductsContainer() {
  return (
    <>
      <HeaderComponent />
      <FavoriteComponent />
      <FooterComponent />
    </>
  );
}
