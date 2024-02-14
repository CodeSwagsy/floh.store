import "./App.css";
import { RouterProvider } from "react-router-dom";
import { DataProvider } from "./context/signin.context.jsx";
import { socket } from "./connect/socket.connect.js";
import { useEffect, useState } from "react";
import { createRouter } from "./router/router.jsx";
import ChatComponent from "./components/chat/chat.component.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [audio] = useState(new Audio("/notification.mp3"));

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");
    const uid = localStorage.getItem("uid");

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    } else {
      socket.auth = { username: "Anonymous", uid };
      socket.connect();
    }

    async function sessionHandler({ sessionID, userID, username }) {
      socket.auth = { sessionID };
      localStorage.setItem("sessionID", sessionID);
      socket.userID = userID;
      socket.username = username;
    }

    function usersHandler(arr) {
      // console.log("user", arr);
      setUsers(arr);
    }

    function messageHandler(obj) {
      setMessages((previous) => [...previous, obj]);
      setShowChat(true);
      audio.play();
    }

    function backupMsgHandler(messages) {
      setMessages(messages);
      const notReadMsg = messages.find(
        (m) => m.notRead && m.to_uid === socket.userID
      );
      if (notReadMsg) {
        setShowChat(true);
        audio.play();
        setActiveChat({
          product: notReadMsg.product,
          uid: notReadMsg.from,
        });
      }
    }

    socket.on("session", sessionHandler);
    socket.on("users", usersHandler);
    socket.on("backup messages", backupMsgHandler);
    socket.on("private message", messageHandler);

    return () => {
      socket.off("session", sessionHandler);
      socket.off("backup messages", backupMsgHandler);
      socket.off("users", usersHandler);
      socket.off("private message", messageHandler);
    };
  }, []);

  const router = createRouter(
    socket,
    users,
    setMessages,
    messages,
    setActiveChat,
    setShowChat
  );

  return (
    <>
      <DataProvider>
        <RouterProvider router={router} />

        {showChat && (
          <ChatComponent
            users={users}
            socket={socket}
            messages={messages}
            setMessages={setMessages}
            setShowChat={setShowChat}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
          />
        )}
      </DataProvider>
    </>
  );
}

export default App;
