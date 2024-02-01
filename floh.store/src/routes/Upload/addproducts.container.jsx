import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";

import { ArticleUploadComponent } from "../../components/upload/addproduct.component.jsx";

export function SignInContainer() {
  return (
    <>
      <HeaderComponent />
      <ArticleUploadComponent />
      <FooterComponent />
    </>
  );
}
