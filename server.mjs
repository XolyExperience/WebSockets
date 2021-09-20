// Använd ws library - npm install ws
import { WebSocketServer } from "ws";

// Import function
import { parse } from "./libs/functions.mjs";

// Skapa en server
const wss = new WebSocketServer({ port: 8081 });

// Lyssna på kopplingar på WebSocketServer
wss.on("connection", (ws) => {
    // Lyssnar varje client
    console.log(`New client connected from IP ${ws._socket.remoteAddress}`);
    console.log(`Number of connected clients: ${wss.clients.size}`);

    // Lyssnar på 'close event'
    ws.on("close", (event) => {
        console.log("Client Dissconected");
        console.log(`Number of connected clients: ${wss.clients.size}`);
    });

    // Lyssnar på 'event message'
    ws.on("message", (data) => {
        console.log("Message recived: %s", data);

        // Use parse date
        let obj = parse(data);
        console.log(obj);

        // ta emot som json
        // console.log(JSON.parse(data));
    });
});
