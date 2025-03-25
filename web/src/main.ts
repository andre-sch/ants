import { io } from "socket.io-client";
import { Game, Player } from "./Game";

const root = document.getElementById("root") as HTMLDivElement;

const socket = io(import.meta.env.VITE_SERVER);

socket.on("game-creation", createGameView);
socket.on("user-creation", (newUser: Player) => {
  const grid = document.getElementById("grid") as HTMLDivElement;
  const playerView = createPlayerView(newUser);
  grid.appendChild(playerView);
});

function createGameView({ room, user }: Game) {
  const grid = document.createElement("div");

  grid.id = "grid";
  grid.dataset.rows = room.grid.rows.toString();
  grid.dataset.columns = room.grid.columns.toString();

  for (const player of room.players) {
    const playerView = createPlayerView(player);
    if (player.id == user.id) playerView.classList.add("user");
    grid.appendChild(playerView);
  }

  root.appendChild(grid);
}

function createPlayerView(player: Player): HTMLElement {
  const playerView = document.createElement("span");
  playerView.className = "player";
  playerView.id = player.id;
  
  const [xPosition, yPosition] = player.position;
  playerView.dataset.x = xPosition.toString();
  playerView.dataset.y = yPosition.toString();

  return playerView;
}
