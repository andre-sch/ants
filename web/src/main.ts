import { io } from "socket.io-client";
import { Room } from "./interfaces/Room";
import { User } from "./interfaces/User";
import { Message } from "./interfaces/Message";

const app = document.getElementById("app") as HTMLDivElement;
const form = document.getElementById("chat") as HTMLFormElement;

const socket = io(import.meta.env.VITE_SERVER);

socket.on("game-creation", createGame);
socket.on("user-creation", renderUser);
socket.on("user-update", renderUser);
socket.on("user-removal", removeUser);
socket.on("chat", renderMessage);

function createGame(room: Room) {
  for (const user of room.users) {
    renderUser(user);
  }
}

function renderUser(user: User): void {
  var userView = document.getElementById(user.id);
  if (!userView) {
    userView = document.createElement("div");
    userView.className = "user";
    userView.id = user.id;
    
    const messages = document.createElement("div");
    messages.className = "messages";

    userView.appendChild(messages);
    app.appendChild(userView);
  };

  const [xPosition, yPosition] = user.position;
  userView.dataset.x = xPosition.toString();
  userView.dataset.y = yPosition.toString();
}

document.addEventListener("click", (event) => {
  const node = event.target as Node;
  if (node == form || node.parentNode == form) return;

  const unit = 5;
  socket.emit("movement", [
    Math.floor(event.clientX / unit),
    Math.floor(event.clientY / unit)
  ]);
});

function removeUser(user: User): void {
  const userView = document.getElementById(user.id);
  if (userView) userView.remove();
}

form.onsubmit = function(event) {
  event.preventDefault();
  const textInput = form["text"] as HTMLInputElement;
  socket.emit("chat", textInput.value);
  textInput.value = "";
}

function renderMessage(message: Message): void {
  const { text, userID } = message;

  const messageView = document.createElement("span");
  messageView.className = "message";
  messageView.textContent = text;

  const userView = document.getElementById(userID);
  userView?.children[0].appendChild(messageView);

  const removalTimeout = 3 + text.length * 0.05;
  setTimeout(() => messageView.remove(), removalTimeout * 1000);
}
