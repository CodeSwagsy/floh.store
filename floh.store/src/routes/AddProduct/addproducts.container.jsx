import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { AddProductComponent } from "../../components/addProduct/addproduct.component.jsx";

export function AddProductContainer() {
  return (
    <>
      <HeaderComponent />
      <AddProductComponent />
      <FooterComponent />
    </>
  );
}
