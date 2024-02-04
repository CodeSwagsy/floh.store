import PropTypes from "prop-types";
import { HeaderComponent } from "../../components/header/header.component.jsx";
import { FooterComponent } from "../../components/footer/footer.component.jsx";
import MessagesComponent from "../../components/messages/messages.container.jsx";

export function MessagesContainer({
  socket,
  messages,
  setActiveChat,
  setShowChat,
}) {
  return (
    <>
      <HeaderComponent />
      <MessagesComponent
        socket={socket}
        messages={messages}
        setActiveChat={setActiveChat}
        setShowChat={setShowChat}
      />
      <FooterComponent />
    </>
  );
}

MessagesContainer.propTypes = {
  socket: PropTypes.object,
  messages: PropTypes.array,
  setShowChat: PropTypes.func,
  setActiveChat: PropTypes.func,
};
