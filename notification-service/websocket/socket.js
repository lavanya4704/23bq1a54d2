const WebSocket = require("ws");

let clients = new Map();

function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const userId = req.url.split("?userId=")[1];

    clients.set(userId, ws);

    ws.on("close", () => {
      clients.delete(userId);
    });
  });

  return {
    sendToUser(userId, notification) {
      const ws = clients.get(userId);

      if (ws) {
        ws.send(JSON.stringify({
          type: "NEW_NOTIFICATION",
          data: notification
        }));
      }
    }
  };
}

module.exports = initWebSocket;