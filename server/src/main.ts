import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Room } from "./domain/Room";
import { Grid } from "./domain/Grid";

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
  const user = room.new_player();
  socket.emit("game", { room, user });
  socket.broadcast.emit("users", { newUser: user });
});

server.listen(3000, () => console.log("server is running"));
