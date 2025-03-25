import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Room } from "./domain/Room";
import { Grid } from "./domain/Grid";
import { PlayerActions } from "./domain/PlayerActions";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT,
    credentials: true
  }
});

const grid = new Grid(10, 10);
const room = new Room(grid);

io.on("connection", (socket) => {
  const user = room.newPlayer();
  socket.emit("game-creation", { room, user });
  socket.broadcast.emit("user-creation", user);

  socket.on("user-action", (key: string) => {
    const handle = PlayerActions[key];
    if (!handle) throw new Error("invalid key");

    handle(user);
    io.emit("user-update", user);
  });

  socket.on("disconnect", () => {
    room.remove(user);
    socket.broadcast.emit("user-removal", user);
  })
});

server.listen(3000, () => console.log("server is running"));
