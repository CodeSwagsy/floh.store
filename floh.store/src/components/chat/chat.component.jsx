import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./chat.component.css";
import { useData } from "../../context/signin.context.jsx";

function ChatComponent({
  users,
  socket,
  messages,
  setMessages,
  setShowChat,
  setActiveChat,
  activeChat,
}) {
  const [product, setProduct] = useState(null);
  const [partnerName, setPartnerName] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [value, setValue] = useState("");
  const lastMessageRef = useRef(null);
  const { updateCounter } = useData();

  useEffect(() => {
    let counter = 0;
    messages.forEach((m) => (m.notRead ? counter++ : null));
    updateCounter(counter);
  }, [messages]);

  useEffect(() => {
    async function findPartnerAndProduct() {
      if (messages.length === 0) return; // do nothing and wait messages

      const pid = activeChat?.product || messages[messages.length - 1]?.product;

      const productRes = await fetch(
        `${import.meta.env.VITE_API}/product/id/${pid}`
      );
      const productData = await productRes.json();
      setProduct(productData.product);

      let uid = activeChat?.uid || messages[messages.length - 1].from;
      if (uid === socket.userID) uid = messages[messages.length - 1].to_uid;

      uid.length === 24
        ? fetch(`${import.meta.env.VITE_API}/user/about/${uid}`)
            .then((res) => res.json())
            .then((data) => setPartnerName(data.doc.info.about.username))
        : setPartnerName("Anonymous" + Math.floor(Math.random() * 1000));

      const roomMessages = messages.filter(
        (m) =>
          m.product === productData.product._id &&
          ((m.from === socket.userID && m.to_uid === uid) ||
            (m.from === uid && m.to_uid === socket.userID))
      );
      setRoomMessages(roomMessages);
    }
    findPartnerAndProduct();
  }, [messages, socket, users, activeChat]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages]);

  function markAsRead() {
    if (!roomMessages.find((m) => m.notRead === true)) return; // do nothing if there are no new messages in the room
    const msgs = [];
    const msgsToUpdate = { time: { $in: [] } };
    messages.forEach((m) => {
      if (
        roomMessages.some(
          (i) =>
            i.text === m.text &&
            i.from === m.from &&
            i.to_uid === m.to_uid &&
            i.product === m.product
        ) &&
        m.product === product._id &&
        m.notRead === true
      ) {
        m.notRead = false; // TODO - fixen - markt all as read!!!
        msgsToUpdate.time["$in"].push(m.time);
      }
      msgs.push(m);
    });
    setMessages(msgs);
    socket.emit("new messages read", msgsToUpdate);
  }

  function closeChat() {
    setShowChat(false);
    markAsRead();
    setActiveChat(null);
  }

  async function sendAnswer(event) {
    event.preventDefault();
    const incomingMsg = roomMessages.find((m) => m.from !== socket.userID);
    const to_uid = incomingMsg.from;
    const to = users.find((user) => user.userID === to_uid)?.socketID;
    const message = {
      product: incomingMsg.product, // id
      from: socket.userID, // id
      to,
      to_uid,
      text: value,
      time: new Date(),
    };

    if (to) {
      socket.emit("private message", message);
    } else {
      const res = await fetch(`${import.meta.env.VITE_API}/message/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...message, notRead: true }),
      });
      const data = await res.json();
      console.log(data);
    }

    setMessages((previous) => [...previous, message]);
    setValue("");
    setActiveChat({
      product: incomingMsg.product,
      uid: to_uid,
    });
  }

  return (
    <>
      <div className="flex flex-col justify-center text-gray-800 i-own-style">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-4 flex items-center shadow i-own-chat-header">
            <img src={product?.images[0]} alt="item image" />
            <h3 className="flex items-center h-10 w-full rounded px-3 text-sm pr-10">
              <a href={`/products/${product?._id}`}>{product?.title}</a>
            </h3>
            <div
              onClick={closeChat}
              className="close flex items-center justify-center"
            >
              ×
            </div>
          </div>

          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {roomMessages.map((message, index) => {
              return socket.userID !== message.from ? (
                <div
                  key={index}
                  className="flex w-full mt-2 space-x-3 max-w-xs"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full i-own-chat-user">
                    {partnerName[0]}
                  </div>
                  <div>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg i-own-chat-user-partner">
                      <p className="text-sm">{message?.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {new Date(message.time).toLocaleDateString() +
                        ", " +
                        new Date(message.time).toLocaleTimeString()}
                      {message.notRead ? (
                        <span className="i-own-chat-new-message">new</span>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
                >
                  <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p className="text-sm">{message?.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {new Date(message.time).toLocaleDateString() +
                        ", " +
                        new Date(message.time).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 i-own-chat-user">
                    {socket.username[0]}
                  </div>
                </div>
              );
            })}
            <div ref={lastMessageRef} />
          </div>

          <form
            onSubmit={sendAnswer}
            className="bg-gray-100 p-4 flex items-center i-own-chat-footer"
          >
            <input
              onChange={(e) => setValue(e.target.value)}
              onClick={markAsRead}
              value={value}
              className="flex items-center h-10 w-full rounded px-3 text-sm pr-10"
              type="text"
              placeholder="Type your message…"
            />
            <button
              type="submit"
              className=" absolute right-6 hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#00FF7F"
                className="w-6 h-6"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatComponent;

ChatComponent.propTypes = {
  socket: PropTypes.object,
  messages: PropTypes.array,
  users: PropTypes.array,
  setMessages: PropTypes.func,
  setShowChat: PropTypes.func,
  setActiveChat: PropTypes.func,
  activeChat: PropTypes.object,
};
