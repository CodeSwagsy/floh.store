import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Conversation from "../conversation/conversation.component.jsx";
import {useNavigate} from "react-router-dom";

function MessagesComponent({ messages, socket, setActiveChat, setShowChat }) {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {

      if (localStorage.getItem("login") !== "true") return navigate("/");

    function getLastMessagesByConversation(messages, myId) {
      const conversations = {};

      messages.forEach((message) => {
        const isUser = message.from === myId;
        const partner = isUser ? message.to_uid : message.from;
        const key = `${message.product}_${myId}_${partner}`;

        if (!conversations[key] || message.time > conversations[key].time) {
          conversations[key] = {
            product: message.product,
            my_id: myId,
            partner_id: partner,
            text: message.text,
            time: message.time,
            notRead: message.notRead || false,
          };
        } else if (message.notRead) {
          conversations[key].notRead = true;
        }
      });

      return Object.values(conversations);
    }

    const conv = getLastMessagesByConversation(messages, socket.userID);
    const sorted = conv.sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    });
    setConversations(sorted);
  }, [messages, socket]);

  return (
    <>
      <div className="container mx-auto">
        <h6 className="text-lg font-bold mb-6">Nachrichten</h6>
        {conversations ? (
          <>
            {conversations.map((con, i) => (
              <Conversation
                key={i}
                pid={con.product}
                text={con.text}
                uid={con.partner_id}
                notRead={con.notRead}
                clickHandler={() => {
                  setActiveChat({
                    product: con.product,
                    uid: con.partner_id,
                  });
                  setShowChat(true);
                }}
              />
            ))}
          </>
        ) : (
          <>
            <p>Keine Benachrichtigungen vorhanden.</p>
          </>
        )}
      </div>
    </>
  );
}

export default MessagesComponent;

MessagesComponent.propTypes = {
  socket: PropTypes.object,
  messages: PropTypes.array,
  setShowChat: PropTypes.func,
  setActiveChat: PropTypes.func,
};
