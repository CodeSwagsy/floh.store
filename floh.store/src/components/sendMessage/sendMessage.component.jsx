import PropTypes from "prop-types";
import { useState } from "react";
import { ButtonComponent } from "../hero/button.component.jsx";
import "./sendMessage.component.css";

function SendMessage({ product, setShowPopup, socket, users, setMessages }) {
  const [value, setValue] = useState("");

  async function sendMessage(event) {
    event.preventDefault();

    const user = users.find((u) => u.userID === product.owner);

    const message = {
      product: product._id, // id
      from: socket.userID, // your socket id
      to: user?.socketID || product.owner, // socket id users array
      to_uid: user?.userID || product.owner, // owner id
      text: value,
      time: new Date(),
    };
    if (user) {
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
    setShowPopup(false);
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 i-own-send-message">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div className="i-own-message-header">
              <img src={product?.images[0]} alt="product image" />
              <h4> {product?.title} </h4>
              <div onClick={() => setShowPopup(false)} className="close">
                ×
              </div>
            </div>

            <form onSubmit={sendMessage} className="space-y-6">
              <div>
                <div className="mt-2">
                  <textarea
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    id="email"
                    name="message"
                    type="email"
                    rows="6"
                    required
                    placeholder="Welche Fragen haben Sie an den Verkäufer/die Verkäuferin?"
                    className="p-2.5 block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-emerald placeholder:text-gray-400 sm:text-sm sm:leading-6 i-own-message-text"
                  ></textarea>
                </div>
              </div>
              <div className="flex w-full justify-center rounded-lg">
                <ButtonComponent
                  text="Senden"
                  size="large"
                  buttonType="submit"
                  height="height"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SendMessage;

SendMessage.propTypes = {
  socket: PropTypes.object,
  product: PropTypes.object,
  users: PropTypes.array,
  setMessages: PropTypes.func,
  setShowPopup: PropTypes.func,
};
