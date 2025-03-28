import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { User } from "./domain/User";
import { Point } from "./domain/Point";
import { pathGenerator } from "./domain/PathGenerator";
import { Room } from "./domain/Room";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT,
    credentials: true
  }
});

const room = new Room();
const movementIntervals: Record<string, NodeJS.Timeout> = {};

io.on("connection", (socket) => {
  const user = room.addUser();
  socket.emit("game-creation", room);
  socket.broadcast.emit("user-creation", user);

  socket.on("movement", (target: Point) => {
    let index = 0;
    const path = pathGenerator.generate(user.position, target);

    clearInterval(movementIntervals[user.id]);
    movementIntervals[user.id] = setInterval(() => {
      user.position = path[index];
      io.emit("user-update", user);
      index++;

      if (index == path.length) {
        clearInterval(movementIntervals[user.id]);
      }
    }, 50);
  });

  socket.on("disconnect", () => {
    room.removeUser(user);
    io.emit("user-removal", user);
  })
});

server.listen(3000, () => console.log("server is running"));
