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
  const sendBtn = useRef(null);
  const [buy, setBuy] = useState(false);
  const [rated, setRated] = useState(false);

  useEffect(() => {
    let counter = 0;
    messages.forEach((m) => (m.notRead ? counter++ : null));
    updateCounter(counter);
  }, [messages]);

  useEffect(() => {
    if (buy) sendBtn.current && sendBtn.current.click();
  }, [buy]);

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
    if (!value) return;
    const incomingMsg = roomMessages.find((m) => m.from !== socket.userID);
    const to_uid = incomingMsg?.from || roomMessages[0].to_uid; // if there are no incoming messages, take the first one;
    const to = users.find((user) => user.userID === to_uid)?.socketID;
    const message = {
      product: incomingMsg?.product || roomMessages[0].product, // id
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
      product: incomingMsg?.product || roomMessages[0].product,
      uid: to_uid,
    });
  }

  async function buyItem() {
    const res = await fetch(
      `${import.meta.env.VITE_API}/product/update/buyer/${product._id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buyer: socket.userID }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.code === 200) {
      setBuy(true);
      setValue(`Ich kaufe ${product?.title}!`);
    }
  }

  async function sendRating(rating) {
    if (!rating || isNaN(rating) || rating > 5 || rating < 1) return;
    const res = await fetch(
      `${import.meta.env.VITE_API}/user/update/rating/${
        product.owner
      }/${rating}`,
      {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ whoRated: socket.userID }),
      }
    );
    const data = await res.json();
    console.log(data);
    setRated(true);

    setTimeout(() => {
      setRated(false);
      setBuy(false);
    }, 5000);
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
            <svg
              title="Kaufen"
              onClick={buyItem}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="springgreen"
              className="w-10 h-10 i-own-chat-buy-btn"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
              />
            </svg>

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
            {buy && socket.userID.length === 24 ? (
              /* only registered user allow rated! */
              <div className="flex items-center flex-col py-2 bg-zinc-700 text-white">
                {!rated ? (
                  <>
                    <p>Bewerte den Verkäufer:</p>
                    <div className="flex mt-2 mb-1">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <svg
                          key={index}
                          onClick={() => sendRating(index)}
                          className="w-5 h-5 ms-1 text-gray-100 hover:text-yellow-300 hover:cursor-pointer relative"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p>Bewertung gespeichert!</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="springgreen"
                      className="w-6 h-6 mt-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </>
                )}
              </div>
            ) : (
              ""
            )}
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
              ref={sendBtn}
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
