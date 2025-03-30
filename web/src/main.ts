import { io } from "socket.io-client";
import { Room } from "./interfaces/Room";
import { User } from "./interfaces/User";

const root = document.getElementById("root") as HTMLDivElement;

const socket = io(import.meta.env.VITE_SERVER);

socket.on("game-creation", createGame);
socket.on("user-creation", renderUser);
socket.on("user-update", renderUser);

function createGame(room: Room) {
  for (const user of room.users) {
    renderUser(user);
  }
}

function renderUser(user: User): void {
  var userView = document.getElementById(user.id);
  if (!userView) {
    userView = document.createElement("span");
    userView.className = "user";
    userView.id = user.id;
    
    root.appendChild(userView);
  };

  const [xPosition, yPosition] = user.position;
  userView.dataset.x = xPosition.toString();
  userView.dataset.y = yPosition.toString();
}

document.addEventListener("click", (event) => {
  const unit = 5;
  socket.emit("movement", [
    Math.floor(event.clientX / unit),
    Math.floor(event.clientY / unit)
  ]);
});

socket.on("user-removal", (user: User) => {
  const userView = document.getElementById(user.id);
  if (userView) userView.remove();
})
