const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname));

setInterval(() => {
  const palpites = ['Player', 'Banker'];
  const palpite = palpites[Math.floor(Math.random() * palpites.length)];

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(palpite);
    }
  });
}, 10000);

server.listen(3000, () => {
  console.log("Servidor iniciado em http://localhost:3000");
});