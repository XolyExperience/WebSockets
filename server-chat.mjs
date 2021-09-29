// Använd ws library - npm install ws
import WebSocket, { WebSocketServer } from "ws";

// Import function
import { parse } from "./libs/functions.mjs";

// Skapa en server
const wss = new WebSocketServer({ port: 8081 });

// Lyssna på kopplingar på WebSocketServer
wss.on("connection", (ws) => {
    // Lyssnar varje client
    console.log(`New client connected from IP ${ws._socket.remoteAddress}`);
    console.log(`Number of connected clients: ${wss.clients.size}`);

    let objBroadcast = {
        type: "message",
        data: "A new client connected to server!",
    };
    wss.broadcast(JSON.stringify(objBroadcast));

    // Lyssnar på 'close event'
    ws.on("close", (event) => {
        console.log("Client Dissconected");
        console.log(`Number of connected clients: ${wss.clients.size}`);
    });

    // Lyssnar på 'event message'
    ws.on("message", (data) => {
        console.log("Message recived: %s", data);

        // Use parse function
        let obj = parse(data);

        // Decide what to do
        switch (obj.type) {
            case "chat":
                // Broadcast
                wss.broadcastButExclude(JSON.stringify(obj), ws);
                break;

            default:
                console.log(`Message type is: ${obj.type}`);
                break;
        }

        console.log(obj);
    });
});

// Send to all clients - broadcast
wss.broadcast = function (data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};
// Send to all clients except specified - broadcast
wss.broadcastButExclude = function (data, someClient) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            if (client !== someClient) {
                client.send(data);
            }
        }
    });
};
