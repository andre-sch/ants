import "dotenv/config";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Point } from "./domain/Point";
import { pathGenerator } from "./domain/PathGenerator";
import { Message } from "./domain/Message";
import { Room } from "./domain/Room";

const app = express();
app.use(cors({
  origin: process.env.CLIENT,
  credentials: true
}));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT,
    methods: ["GET", "POST"],
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

  socket.on("chat", (text: string) => {
    const message = new Message(text, user.id);
    io.emit("chat", message);
  });

  socket.on("disconnect", () => {
    room.removeUser(user);
    io.emit("user-removal", user);
  })
});

server.listen(3000, () => console.log("server is running"));
