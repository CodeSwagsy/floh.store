import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API;

export const socket = io(URL, {
  autoConnect: false,
});
