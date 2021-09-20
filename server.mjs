// Använd ws library - npm install ws
import { WebSocketServer } from "ws";

// Skapa en server
const wss = new WebSocketServer({ port: 8081 });

// Lyssna på kopplingar
wss.on("connection", (ws) => {
  console.log(`New connection`);
});
