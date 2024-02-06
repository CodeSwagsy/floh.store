import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import { SingleProductComponent } from "../../components/singleProduct/singleproduct.component.jsx";

export function SingleProductContainer({ socket, users, setMessages }) {
  return (
    <>
      <HeaderComponent />
      <SingleProductComponent
        socket={socket}
        users={users}
        setMessages={setMessages}
      />
      <FooterComponent />
    </>
  );
}
