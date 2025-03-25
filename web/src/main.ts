import { io } from "socket.io-client";
import { Game, Player } from "./Game";

const root = document.getElementById("root") as HTMLDivElement;

const socket = io(import.meta.env.VITE_SERVER);
socket.on("game", createGameView);

function createGameView(game: Game) {
  const grid = document.createElement("div");

  grid.id = "grid";
  grid.dataset.rows = game.room.grid.rows.toString();
  grid.dataset.columns = game.room.grid.columns.toString();

  for (const player of game.room.players) {
    const playerView = createPlayerView(player, game.user);
    grid.appendChild(playerView);
  }

  root.appendChild(grid);
}

function createPlayerView(player: Player, user: Player): HTMLElement {
  const playerView = document.createElement("span");
  playerView.className = "player";
  playerView.id = player.id;

  if (player.id == user.id) {
    playerView.classList.add("user");
  }
  
  const [xPosition, yPosition] = player.position;
  playerView.dataset.x = xPosition.toString();
  playerView.dataset.y = yPosition.toString();

  return playerView;
}
