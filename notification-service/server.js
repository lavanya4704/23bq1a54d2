const express = require("express");
const http = require("http");
const cors = require("cors");

const notificationRoutes = require("./routes/notifications");
const initWebSocket = require("./websocket/socket");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/notifications", notificationRoutes);

//  Home route
app.get("/", (req, res) => {
  res.send("Notification Service is running ");
});

const server = http.createServer(app);

// WebSocket init
const wsService = initWebSocket(server);

// Example: send notification every 10 sec (demo)
setInterval(() => {
  const sample = {
    id: "live-1",
    userId: "1",
    title: "Live Update",
    message: "This is a real-time notification",
    createdAt: new Date().toISOString()
  };

  wsService.sendToUser("1", sample);
}, 10000);


server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});