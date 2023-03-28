require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const path = require("path");

let rooms = {};
let idRoomMap = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (rooms[roomID]) {
      if (rooms[roomID].length >= 2) {
        socket.emit("room full");
      } else {
        idRoomMap[socket.id] = roomID;
        rooms[roomID].push(socket.id);
        const otherUser = rooms[roomID].find((id) => id !== socket.id);
        if (otherUser) {
          socket.emit("other user", otherUser);
          socket.to(otherUser).emit("user joined", socket.id);
        }
      }
    } else {
      rooms[roomID] = [socket.id];
      idRoomMap[socket.id] = roomID;

      // socket.to(socket.id).emit('myId',socket.id);
    }
    console.log("user join-->", rooms);
    console.log("user join map-->", idRoomMap[socket.id]);
  });

  socket.on("leave room", ({ roomID, otherUser }) => {
    console.log("roomID is: ", roomID);
    console.log("otherUser is: ", otherUser);

    if (rooms[roomID] && rooms[roomID].length === 2) {
      delete idRoomMap[socket.id];
      var filtered = rooms[roomID].filter(function (value, index, arr) {
        return value !== socket.id;
      });
      rooms[roomID] = filtered;

      console.log("rooms is: ", rooms);
      socket.to(otherUser).emit("user left");
    } else if (rooms[roomID].length === 1) {
      delete idRoomMap[socket.id];
      var filtered = rooms[roomID].filter(function (value, index, arr) {
        return value !== socket.id;
      });
      rooms[roomID] = filtered;

      delete rooms[roomID];

      console.log("rooms is: ", rooms);
    }
  });

  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", (payload) => {
    io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", (incoming) => {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });

  //new

  socket.on("sharescreen status", (payload) => {
    console.log("sharescreen status--->", payload);
    socket
      .to(payload.target)
      .emit("sharescreen status", payload.screenShareFlag);
  });


///////// NEW

  socket.on('peer video status',(payload)=>{
    socket.to(payload.target).emit('peer video status',payload.peerVideoFlag)
  })

  socket.on("disconnect", () => {
    console.log("disconnect user id --->", socket.id);
    console.log("rooms--->", idRoomMap[socket.id]);
    console.log("rooms all--->", rooms);

    let other;

    if (idRoomMap[socket.id]) {
      if (rooms[idRoomMap[socket.id]].length === 1) {
        console.log("rooms---> 2-->", rooms[idRoomMap[socket.id]]);
        delete rooms[idRoomMap[socket.id]];
      } else if (rooms[idRoomMap[socket.id]].length === 2) {
        if (rooms[idRoomMap[socket.id]][0] == socket.id)
          other = rooms[idRoomMap[socket.id]][1];
        else other = rooms[idRoomMap[socket.id]][0];
        rooms[idRoomMap[socket.id]] = [other];
        socket.to(other).emit("user left");
      }
      console.log("other  Id-->", other);
      console.log("disconnect==>", rooms);
      console.log(
        "rooms[idRoomMap[socket.id]]==>",
        rooms[idRoomMap[socket.id]]
      );
      delete idRoomMap[socket.id];
    }
  });
});

if (process.env.PROD) {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`server is running on port ${port}`));
