const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Cola de mensajes
let messageQueue = [];

// Middleware para servir el frontend
app.use(express.static("public"));

// Socket.IO para manejar conexiones
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Recibir mensajes y añadirlos a la cola
  socket.on("newMessage", (msg) => {
    console.log("Mensaje recibido:", msg);
    messageQueue.push(msg);

    // Simular proceso en cola
    setTimeout(() => {
      const processedMessage = messageQueue.shift(); // Procesar el mensaje
      console.log("Mensaje procesado:", processedMessage);
      socket.emit("messageProcessed", processedMessage); // Enviar respuesta
    }, 3000); // Simular un retardo en el procesamiento
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
