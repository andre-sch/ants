import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT,
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);
  
  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });
  
  socket.on("hello", (arg) => {
    console.log("received:", arg);
  })
})

server.listen(3000, () => console.log("server is running"));
