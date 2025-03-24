import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER);
socket.emit("hello", "world");
