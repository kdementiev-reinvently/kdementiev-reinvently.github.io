var express = require('express');
var app = express();
var http = require('http').createServer(app);
let port = 8000

app.use('/dist', (req, res) => {
  let filePath = __dirname.replace("/example", "/dist")
  let newFile = filePath + req.path
  res.sendFile(newFile);
})

app.use('/static', (req, res) => {
  let newFile = __dirname + '/static' + req.path
  res.sendFile(newFile);
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/screen-layout', function(req, res) {
  res.sendFile(__dirname + '/layout-poc.html');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
  console.log("http://127.0.0.1:8000/")
});