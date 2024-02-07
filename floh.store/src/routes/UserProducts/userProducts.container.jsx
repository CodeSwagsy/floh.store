import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import UserProductsComponent from "../../components/userProducts/userProduct.component.jsx";

export function UserProductsContainer() {
  return (
    <>
      <HeaderComponent />
      <UserProductsComponent />
      <FooterComponent />
    </>
  );
}
