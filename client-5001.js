const express = require('express')
const path = require('path');
const SocketServer = require('ws').Server


const PORT = 5001
const app = express();
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/CRDT-5001.html'));
});

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))

const wss = new SocketServer({
  server
})
var CLIENTS=[];

wss.on('connection', ws => {
  CLIENTS.push(ws);
  console.log('New Client connected')

  let clients = CLIENTS
  clients.forEach(client => {
    client.send('new join')
  })

  ws.on('message', data => {
    let clients = wss.clients
    clients.forEach(client => {
      client.send(data)
    })
  })

  ws.on('close', () => {
    console.log('A Client disconnected')
  })

})
